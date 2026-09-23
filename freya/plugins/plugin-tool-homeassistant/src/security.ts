import fs from 'node:fs';

/** Home Assistant 实体访问控制与权限安全网关 */
export class HomeAssistantSecurityGateway {
  private controlAllowed = false;
  private readonly optionsPath: string;
  private watcher: fs.FSWatcher | null = null;
  private debounceTimer: NodeJS.Timeout | null = null;

  constructor(optionsPath = '/data/options.json') {
    this.optionsPath = optionsPath;
    this.reloadOptions();
    this.startWatching();
  }

  private reloadOptions(): void {
    try {
      if (fs.existsSync(this.optionsPath)) {
        const raw = fs.readFileSync(this.optionsPath, 'utf-8');
        const parsed = JSON.parse(raw);
        this.controlAllowed = Boolean(parsed.allow_control);
        return;
      }
    } catch { }

    this.controlAllowed = false;
  }

  private startWatching(): void {
    try {
      if (fs.existsSync(this.optionsPath)) {
        this.watcher = fs.watch(this.optionsPath, (eventType) => {
          if (eventType === 'change' || eventType === 'rename') {
            if (this.debounceTimer) {
              clearTimeout(this.debounceTimer);
            }
            this.debounceTimer = setTimeout(() => {
              this.reloadOptions();
              if (eventType === 'rename') {
                this.stopWatching();
                this.startWatching();
              }
            }, 100);
          }
        });
        if (this.watcher.unref) {
          this.watcher.unref();
        }
      }
    } catch { }
  }

  stopWatching(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    if (this.watcher) {
      try { this.watcher.close(); } catch { }
      this.watcher = null;
    }
  }

  isControlAllowed(): boolean {
    return this.controlAllowed;
  }

  assertEntityExposed(entityId: string, exposedSet: Set<string>): void {
    if (!exposedSet.has(entityId)) {
      throw new Error(`实体 "${entityId}" 不存在或不可访问。`);
    }
  }

  private static readonly BLOCKED_DOMAINS = new Set(['homeassistant', 'hassio', 'shell_command', 'command_line']);

  assertCanCallService(
    domain: string,
    service: string,
    entityId: string | undefined,
    serviceData: Record<string, any>,
    exposedSet: Set<string>
  ): void {
    if (!this.isControlAllowed()) {
      throw new Error('当前处于只读模式，禁止执行控制指令。');
    }

    if (HomeAssistantSecurityGateway.BLOCKED_DOMAINS.has(domain.toLowerCase())) {
      throw new Error(`安全策略禁止调用系统服务 "${domain}.${service}"。`);
    }

    const forbiddenKeys = ['area_id', 'device_id', 'floor_id', 'label_id'];
    for (const key of forbiddenKeys) {
      if (key in serviceData || (serviceData.target && typeof serviceData.target === 'object' && key in serviceData.target)) {
        throw new Error(`安全策略限制：仅支持针对已暴露的具体实体控制，不支持按 ${key} 批量控制。`);
      }
    }

    const targetEntities = new Set<string>();
    if (entityId) {
      targetEntities.add(entityId);
    }

    const dataEntityId = serviceData.entity_id || serviceData.target?.entity_id;
    if (dataEntityId) {
      if (Array.isArray(dataEntityId)) {
        dataEntityId.forEach((id) => targetEntities.add(String(id).trim()));
      } else {
        targetEntities.add(String(dataEntityId).trim());
      }
    }

    if (targetEntities.size === 0) {
      throw new Error('安全策略限制：调用服务必须明确指定具体的目标 entity_id。');
    }

    for (const id of targetEntities) {
      this.assertEntityExposed(id, exposedSet);
    }
  }
}
