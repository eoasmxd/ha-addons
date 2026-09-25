import type { FreyaContext } from '@eoasmxd/freya-sdk';

/**
 * Home Assistant 实体访问控制与权限安全网关
 * Home Assistant entity access control and permission security gateway
 */
export class HomeAssistantSecurityGateway {
  private ctx?: FreyaContext;

  setContext(ctx: FreyaContext): void {
    this.ctx = ctx;
  }

  isControlAllowed(): boolean {
    const cfg = (this.ctx?.config as any)?.homeassistant;
    return Boolean(cfg?.allowControl);
  }

  assertEntityExposed(entityId: string, exposedSet: Set<string>): void {
    if (!exposedSet.has(entityId)) {
      // 实体未暴露或不存在
      throw new Error(`Entity "${entityId}" does not exist or is not accessible.`);
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
      // 只读模式拦截
      throw new Error('Currently in read-only mode, control commands are forbidden.');
    }

    if (HomeAssistantSecurityGateway.BLOCKED_DOMAINS.has(domain.toLowerCase())) {
      // 系统服务调用拦截
      throw new Error(`Security policy forbids calling system service "${domain}.${service}".`);
    }

    const forbiddenKeys = ['area_id', 'device_id', 'floor_id', 'label_id'];
    for (const key of forbiddenKeys) {
      if (key in serviceData || (serviceData.target && typeof serviceData.target === 'object' && key in serviceData.target)) {
        // 批量控制拦截
        throw new Error(`Security policy restriction: Only specific exposed entities are supported, batch control by ${key} is forbidden.`);
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
      // 缺少目标实体提示
      throw new Error('Security policy restriction: Calling a service must explicitly specify target entity_id.');
    }

    for (const id of targetEntities) {
      this.assertEntityExposed(id, exposedSet);
    }
  }
}
