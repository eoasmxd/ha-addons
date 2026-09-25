import type { FreyaContext, FreyaTool, ToolDefinition } from '@eoasmxd/freya-sdk';
import type { HomeAssistantClient } from './client.js';
import type { HomeAssistantSecurityGateway } from './security.js';

/**
 * Home Assistant 实体列表查询工具
 * Home Assistant entity list query tool
 */
export class HomeAssistantListEntitiesTool implements FreyaTool {
  constructor(
    private readonly client: HomeAssistantClient,
    private readonly security: HomeAssistantSecurityGateway
  ) { }

  getDefinition(): ToolDefinition {
    return {
      name: 'homeassistant_list_entities',
      description: '列出 Home Assistant 中的设备与实体列表（支持按域或关键词筛选）。',
      parameters: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            description: '可选的实体域筛选，例如 "sensor"、"binary_sensor"、"light"、"switch"、"climate" 等。'
          },
          keyword: {
            type: 'string',
            description: '可选的关键词，匹配实体 ID 或友好名称（Friendly Name）。'
          }
        }
      }
    };
  }

  async execute(args: Record<string, any>, ctx: FreyaContext): Promise<string> {
    const exposedSet = await this.client.getExposedEntities();
    if (exposedSet.size === 0) {
      return '当前未检索到可用实体。';
    }

    const allStates = await this.client.getStates();
    const domain = typeof args.domain === 'string' ? args.domain.trim().toLowerCase() : '';
    const keyword = typeof args.keyword === 'string' ? args.keyword.trim().toLowerCase() : '';

    const matched = allStates.filter((item) => {
      if (!exposedSet.has(item.entity_id)) {
        return false;
      }

      if (domain && !item.entity_id.startsWith(`${domain}.`)) {
        return false;
      }

      if (keyword) {
        const friendlyName = String(item.attributes?.friendly_name || '').toLowerCase();
        if (!item.entity_id.toLowerCase().includes(keyword) && !friendlyName.includes(keyword)) {
          return false;
        }
      }

      return true;
    });

    if (matched.length === 0) {
      return '未找到符合条件的实体。';
    }

    const lines = matched.map((item) => {
      const name = item.attributes?.friendly_name || item.entity_id;
      const unit = item.attributes?.unit_of_measurement ? ` ${item.attributes.unit_of_measurement}` : '';
      return `- ${item.entity_id} (${name}): ${item.state}${unit}`;
    });

    return `已找到 ${matched.length} 个实体：\n${lines.join('\n')}`;
  }
}

/**
 * Home Assistant 单实体状态查询工具
 * Home Assistant single entity state query tool
 */
export class HomeAssistantGetStateTool implements FreyaTool {
  constructor(
    private readonly client: HomeAssistantClient,
    private readonly security: HomeAssistantSecurityGateway
  ) { }

  getDefinition(): ToolDefinition {
    return {
      name: 'homeassistant_get_state',
      description: '获取 Home Assistant 中指定实体的实时状态及详细属性。',
      parameters: {
        type: 'object',
        properties: {
          entity_id: {
            type: 'string',
            description: '实体唯一标识 ID，例如 "sensor.living_room_temperature" 或 "light.kitchen_light"。'
          }
        },
        required: ['entity_id']
      }
    };
  }

  async execute(args: Record<string, any>, ctx: FreyaContext): Promise<string> {
    const entityId = String(args.entity_id || '').trim();
    if (!entityId) {
      return '错误: 必须指定 entity_id。';
    }

    const exposedSet = await this.client.getExposedEntities();
    this.security.assertEntityExposed(entityId, exposedSet);

    const state = await this.client.getState(entityId);
    return JSON.stringify(
      {
        entity_id: state.entity_id,
        state: state.state,
        attributes: state.attributes,
        last_changed: state.last_changed,
        last_updated: state.last_updated
      },
      null,
      2
    );
  }
}

/**
 * Home Assistant 设备控制服务调用工具
 * Home Assistant device control service call tool
 */
export class HomeAssistantCallServiceTool implements FreyaTool {
  constructor(
    private readonly client: HomeAssistantClient,
    private readonly security: HomeAssistantSecurityGateway
  ) { }

  getDefinition(): ToolDefinition {
    return {
      name: 'homeassistant_call_service',
      description: '调用 Home Assistant 设备控制服务（例如开关灯、控制开关、调节温度等）。',
      parameters: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            description: '服务域，例如 "light"、"switch"、"cover"、"climate" 等。'
          },
          service: {
            type: 'string',
            description: '服务名称，例如 "turn_on"、"turn_off"、"toggle" 等。'
          },
          entity_id: {
            type: 'string',
            description: '目标实体唯一标识 ID，例如 "light.living_room"。'
          },
          service_data: {
            type: 'object',
            description: '可选的服务附加参数，例如亮度、颜色、目标温度等。'
          }
        },
        required: ['domain', 'service', 'entity_id']
      }
    };
  }

  async execute(args: Record<string, any>, ctx: FreyaContext): Promise<string> {
    const domain = String(args.domain || '').trim();
    const service = String(args.service || '').trim();
    const entityId = args.entity_id ? String(args.entity_id).trim() : undefined;
    const extraData = (args.service_data && typeof args.service_data === 'object') ? args.service_data : {};

    const exposedSet = await this.client.getExposedEntities();
    this.security.assertCanCallService(domain, service, entityId, extraData, exposedSet);

    const payload: Record<string, any> = { ...extraData };
    if (entityId) {
      payload.entity_id = entityId;
    }

    const result = await this.client.callService(domain, service, payload);
    const detail = result && Object.keys(result).length > 0 ? ` 返回信息: ${JSON.stringify(result)}` : '';
    return `服务 "${domain}.${service}" 执行成功。${detail}`.trim();
  }
}

/**
 * Home Assistant 可用服务定义与参数查询工具
 * Home Assistant available service definition and parameter query tool
 */
export class HomeAssistantListServicesTool implements FreyaTool {
  constructor(private readonly client: HomeAssistantClient) { }

  getDefinition(): ToolDefinition {
    return {
      name: 'homeassistant_list_services',
      description: '查询 Home Assistant 中支持的服务列表及各服务的参数说明（可按 domain 域筛选，例如 "light"、"switch"、"climate" 等）。',
      parameters: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            description: '可选的域名称筛选，例如 "light"、"switch"、"climate"、"cover" 等。如果指定，只返回该域下的服务及详细参数定义。'
          }
        }
      }
    };
  }

  async execute(args: Record<string, any>, ctx: FreyaContext): Promise<string> {
    const allServices = await this.client.getServices();
    const domainFilter = typeof args.domain === 'string' ? args.domain.trim().toLowerCase() : '';

    if (domainFilter) {
      const matched = allServices.find((item) => item.domain.toLowerCase() === domainFilter);
      if (!matched || !matched.services) {
        return `未找到与域 "${domainFilter}" 相关的服务。`;
      }

      const lines: string[] = [`域 "${domainFilter}" 支持的可用服务如下：`];
      for (const [serviceName, serviceDef] of Object.entries(matched.services)) {
        const desc = serviceDef?.description ? ` - ${serviceDef.description}` : '';
        lines.push(`\n### ${domainFilter}.${serviceName}${desc}`);

        if (serviceDef?.fields && Object.keys(serviceDef.fields).length > 0) {
          lines.push('  参数列表:');
          for (const [fieldName, fieldDef] of Object.entries<any>(serviceDef.fields)) {
            const fieldDesc = fieldDef?.description ? `: ${fieldDef.description}` : '';
            const example = fieldDef?.example !== undefined ? ` (示例: ${JSON.stringify(fieldDef.example)})` : '';
            lines.push(`    - ${fieldName}${fieldDesc}${example}`);
          }
        }
      }
      return lines.join('\n');
    }

    const domainNames = allServices.map((item) => item.domain).sort();
    return `当前系统支持以下 ${domainNames.length} 个服务域（如需查询某个域的详细服务与参数说明，请传入具体 domain 参数）：\n${domainNames.join(', ')}`;
  }
}
