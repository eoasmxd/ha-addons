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

  assertCanCallService(entityId: string | undefined, exposedSet: Set<string>): void {
    if (!this.isControlAllowed()) {
      throw new Error('当前处于只读模式，禁止执行控制指令。');
    }

    if (entityId) {
      this.assertEntityExposed(entityId, exposedSet);
    }
  }
}
