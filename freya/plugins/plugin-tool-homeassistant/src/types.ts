/** Home Assistant 实体实时状态数据模型 */
export interface HAEntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
  last_updated?: string;
}

/** Home Assistant 服务域及其包含的服务定义集合 */
export interface HAServiceDomain {
  domain: string;
  services: Record<string, {
    description?: string;
    fields?: Record<string, {
      description?: string;
      example?: any;
      required?: boolean;
    }>;
  }>;
}

/** Home Assistant 客户端通信配置 */
export interface HomeAssistantClientConfig {
  baseUrl: string;
  wsUrl: string;
  token: string;
}
