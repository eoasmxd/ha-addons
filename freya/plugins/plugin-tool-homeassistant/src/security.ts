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
      throw new Error(`Entity "${entityId}" does not exist or is not accessible.`);
    }
  }

  private static readonly ALLOWED_PURE_DOMAINS = new Set([
    'notify',
    'persistent_notification'
  ]);

  private static readonly ALLOWED_ENTITY_DOMAINS = new Set([
    'light',
    'switch',
    'cover',
    'climate',
    'fan',
    'humidifier',
    'lock',
    'media_player',
    'vacuum',
    'valve',
    'water_heater',
    'lawn_mower',
    'siren',
    'button',
    'number',
    'select',
    'text',
    'date',
    'datetime',
    'time',
    'remote',
    'scene',
    'input_boolean',
    'input_button',
    'input_number',
    'input_select',
    'input_datetime',
    'input_text',
    'timer',
    'counter',
    'script'
  ]);

  assertCanCallService(
    domain: string,
    service: string,
    entityId: string | undefined,
    serviceData: Record<string, any>,
    exposedSet: Set<string>
  ): void {
    if (!this.isControlAllowed()) {
      throw new Error('Currently in read-only mode, control commands are forbidden.');
    }

    const lowerDomain = domain.toLowerCase();

    if (HomeAssistantSecurityGateway.ALLOWED_PURE_DOMAINS.has(lowerDomain)) {
      return;
    }

    if (!HomeAssistantSecurityGateway.ALLOWED_ENTITY_DOMAINS.has(lowerDomain)) {
      throw new Error(`Security policy restriction: Domain "${domain}" is not in the allowed services whitelist.`);
    }

    const forbiddenKeys = ['area_id', 'device_id', 'floor_id', 'label_id'];
    for (const key of forbiddenKeys) {
      if (key in serviceData || (serviceData.target && typeof serviceData.target === 'object' && key in serviceData.target)) {
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
      throw new Error('Security policy restriction: Calling a service must explicitly specify target entity_id.');
    }

    for (const id of targetEntities) {
      this.assertEntityExposed(id, exposedSet);
    }
  }
}
