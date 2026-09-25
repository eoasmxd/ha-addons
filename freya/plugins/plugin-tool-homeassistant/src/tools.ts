import type { FreyaTool, ToolDefinition } from '@eoasmxd/freya-sdk';
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
      // 列出实体工具描述
      description: 'List devices and entities in Home Assistant (supports filtering by domain or keyword).',
      parameters: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            // 实体域名筛选参数
            description: 'Optional entity domain filter, e.g. "sensor", "binary_sensor", "light", "switch", "climate", etc.'
          },
          keyword: {
            type: 'string',
            // 实体关键词匹配参数
            description: 'Optional keyword to match entity ID or friendly name.'
          }
        }
      }
    };
  }

  async execute(args: Record<string, any>): Promise<string> {
    const exposedSet = await this.client.getExposedEntities();
    if (exposedSet.size === 0) {
      // 未检索到可用实体出参
      return 'No accessible entities currently found.';
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
      // 未找到匹配实体
      return 'No matching entities found.';
    }

    const lines = matched.map((item) => {
      const name = item.attributes?.friendly_name || item.entity_id;
      const unit = item.attributes?.unit_of_measurement ? ` ${item.attributes.unit_of_measurement}` : '';
      return `- ${item.entity_id} (${name}): ${item.state}${unit}`;
    });

    // 匹配实体结果列表出参
    return `Found ${matched.length} entities:\n${lines.join('\n')}`;
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
      // 单实体状态查询描述
      description: 'Get real-time state and detailed attributes for a specified entity in Home Assistant.',
      parameters: {
        type: 'object',
        properties: {
          entity_id: {
            type: 'string',
            // 目标实体 ID 参数
            description: 'Unique entity ID, e.g. "sensor.living_room_temperature" or "light.kitchen_light".'
          }
        },
        required: ['entity_id']
      }
    };
  }

  async execute(args: Record<string, any>): Promise<string> {
    const entityId = String(args.entity_id || '').trim();
    if (!entityId) {
      // 缺少实体 ID 出参
      return 'Error: entity_id is required.';
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
      // 设备控制服务调用描述
      description: 'Call Home Assistant device control services (e.g. turn on/off lights, toggle switches, set temperature, etc.).',
      parameters: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            // 服务域参数
            description: 'Service domain, e.g. "light", "switch", "cover", "climate", etc.'
          },
          service: {
            type: 'string',
            // 服务名参数
            description: 'Service name, e.g. "turn_on", "turn_off", "toggle", etc.'
          },
          entity_id: {
            type: 'string',
            // 目标实体 ID 参数
            description: 'Target entity unique identifier ID, e.g. "light.living_room".'
          },
          service_data: {
            type: 'object',
            // 附加数据参数
            description: 'Optional additional service parameters, such as brightness, color, target temperature, etc.'
          }
        },
        required: ['domain', 'service', 'entity_id']
      }
    };
  }

  async execute(args: Record<string, any>): Promise<string> {
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
    const detail = result && Object.keys(result).length > 0 ? ` Response details: ${JSON.stringify(result)}` : '';
    // 执行成功出参
    return `Service "${domain}.${service}" executed successfully.${detail}`.trim();
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
      // 服务列表及参数查询工具描述
      description: 'Query supported services in Home Assistant and parameter definitions for each service (can filter by domain, e.g. "light", "switch", "climate", etc.).',
      parameters: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            // 域名筛选参数
            description: 'Optional domain name filter, e.g. "light", "switch", "climate", "cover", etc. If specified, only services under that domain with parameter definitions are returned.'
          }
        }
      }
    };
  }

  async execute(args: Record<string, any>): Promise<string> {
    const allServices = await this.client.getServices();
    const domainFilter = typeof args.domain === 'string' ? args.domain.trim().toLowerCase() : '';

    if (domainFilter) {
      const matched = allServices.find((item) => item.domain.toLowerCase() === domainFilter);
      if (!matched || !matched.services) {
        // 未找到域相关服务出参
        return `No services found for domain "${domainFilter}".`;
      }

      // 域支持的服务详情列表出参
      const lines: string[] = [`Available services supported by domain "${domainFilter}":`];
      for (const [serviceName, serviceDef] of Object.entries(matched.services)) {
        const desc = serviceDef?.description ? ` - ${serviceDef.description}` : '';
        lines.push(`\n### ${domainFilter}.${serviceName}${desc}`);

        if (serviceDef?.fields && Object.keys(serviceDef.fields).length > 0) {
          lines.push('  Parameters:');
          for (const [fieldName, fieldDef] of Object.entries<any>(serviceDef.fields)) {
            const fieldDesc = fieldDef?.description ? `: ${fieldDef.description}` : '';
            const example = fieldDef?.example !== undefined ? ` (example: ${JSON.stringify(fieldDef.example)})` : '';
            lines.push(`    - ${fieldName}${fieldDesc}${example}`);
          }
        }
      }
      return lines.join('\n');
    }

    const domainNames = allServices.map((item) => item.domain).sort();
    // 全局支持域列表出参
    return `Currently supported ${domainNames.length} service domains (to inspect detailed services and parameters for a domain, provide the domain argument):\n${domainNames.join(', ')}`;
  }
}
