import type { HAEntityState, HAServiceDomain, HomeAssistantClientConfig } from './types.js';

/**
 * Home Assistant REST 与 WebSocket 通信客户端
 * Home Assistant REST and WebSocket communication client
 */
export class HomeAssistantClient {
  private readonly config: HomeAssistantClientConfig;
  private readonly cacheTtlMs: number;
  private exposedCache = new Set<string>();
  private lastSyncTime = 0;
  private syncPromise: Promise<Set<string>> | null = null;
  private syncTimer: NodeJS.Timeout | null = null;

  constructor(options?: Partial<HomeAssistantClientConfig>) {
    const token = options?.token || process.env.SUPERVISOR_TOKEN || '';
    const baseUrl = options?.baseUrl || 'http://supervisor/core/api';
    const wsUrl = options?.wsUrl || 'ws://supervisor/core/websocket';

    this.cacheTtlMs = 60_000;
    this.config = {
      baseUrl: baseUrl.replace(/\/+$/, ''),
      wsUrl,
      token
    };
  }

  startBackgroundSync(intervalMs = 60_000): void {
    this.triggerSync();

    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }
    this.syncTimer = setInterval(() => {
      this.triggerSync();
    }, intervalMs);

    if (this.syncTimer.unref) {
      this.syncTimer.unref();
    }
  }

  stopBackgroundSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }

  private triggerSync(): void {
    this.fetchExposedViaWebSocket().catch(() => { });
  }

  async getExposedEntities(): Promise<Set<string>> {
    const now = Date.now();
    if (this.exposedCache.size > 0 && now - this.lastSyncTime < this.cacheTtlMs) {
      return this.exposedCache;
    }

    if (this.syncPromise) {
      return this.syncPromise;
    }

    return this.fetchExposedViaWebSocket();
  }

  private async fetchExposedViaWebSocket(): Promise<Set<string>> {
    if (this.syncPromise) {
      return this.syncPromise;
    }

    this.syncPromise = new Promise<Set<string>>((resolve, reject) => {
      if (!this.config.token) {
        return reject(new Error('未检测到 SUPERVISOR_TOKEN 或 HA_TOKEN 凭据。'));
      }

      const socket = new WebSocket(this.config.wsUrl);
      let messageId = 1;
      let completed = false;

      const finish = (err?: Error, result?: Set<string>) => {
        if (completed) return;
        completed = true;
        clearTimeout(timer);
        try { socket.close(); } catch { }
        if (err) {
          if (this.exposedCache.size > 0) {
            resolve(this.exposedCache);
          } else {
            reject(err);
          }
        } else {
          resolve(result || this.exposedCache);
        }
      };

      const timer = setTimeout(() => {
        finish(new Error('连接 Home Assistant WebSocket 超时。'));
      }, 10_000);

      socket.onopen = () => { };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data.toString());
          if (data.type === 'auth_required') {
            socket.send(JSON.stringify({
              type: 'auth',
              access_token: this.config.token
            }));
            return;
          }

          if (data.type === 'auth_ok') {
            socket.send(JSON.stringify({
              id: messageId++,
              type: 'homeassistant/expose_entity/list'
            }));
            return;
          }

          if (data.type === 'auth_invalid') {
            finish(new Error(`WebSocket 鉴权失败: ${data.message || '凭据无效'}`));
            return;
          }

          if (data.type === 'result') {
            if (!data.success) {
              finish(new Error(`获取暴露实体列表失败: ${data.error?.message || '未知错误'}`));
              return;
            }

            const exposed = new Set<string>();
            const rawResult = data.result?.exposed_entities || data.result || {};

            for (const [entityId, assistantMap] of Object.entries(rawResult)) {
              if (assistantMap && typeof assistantMap === 'object') {
                const conv = (assistantMap as any)?.conversation;
                if (conv === true || conv?.should_expose === true) {
                  exposed.add(entityId);
                }
              }
            }

            this.exposedCache = exposed;
            this.lastSyncTime = Date.now();
            finish(undefined, exposed);
            return;
          }
        } catch (err: any) {
          finish(err instanceof Error ? err : new Error(String(err)));
        }
      };

      socket.onerror = (err: any) => {
        finish(err instanceof Error ? err : new Error('WebSocket 通信异常。'));
      };

      socket.onclose = () => {
        finish(new Error('WebSocket 连接已关闭。'));
      };
    }).finally(() => {
      this.syncPromise = null;
    });

    return this.syncPromise;
  }

  async getStates(): Promise<HAEntityState[]> {
    const url = `${this.config.baseUrl}/states`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.config.token}`,
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(10_000)
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`查询实体状态失败 [${response.status}]: ${errText || response.statusText}`);
    }

    return (await response.json()) as HAEntityState[];
  }

  async getState(entityId: string): Promise<HAEntityState> {
    const url = `${this.config.baseUrl}/states/${encodeURIComponent(entityId)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.config.token}`,
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(10_000)
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`查询实体 "${entityId}" 状态失败 [${response.status}]: ${errText || response.statusText}`);
    }

    return (await response.json()) as HAEntityState;
  }

  async callService(domain: string, service: string, serviceData: Record<string, any> = {}): Promise<any> {
    const url = `${this.config.baseUrl}/services/${encodeURIComponent(domain)}/${encodeURIComponent(service)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serviceData),
      signal: AbortSignal.timeout(10_000)
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`调用服务 "${domain}.${service}" 失败 [${response.status}]: ${errText || response.statusText}`);
    }

    return await response.json().catch(() => ({}));
  }

  async getServices(): Promise<HAServiceDomain[]> {
    const url = `${this.config.baseUrl}/services`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.config.token}`,
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(10_000)
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`查询服务列表失败 [${response.status}]: ${errText || response.statusText}`);
    }

    return (await response.json()) as HAServiceDomain[];
  }
}
