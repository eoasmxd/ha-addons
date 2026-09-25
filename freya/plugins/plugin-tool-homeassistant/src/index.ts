import type { FreyaContext, FreyaTool, ToolPlugin } from '@eoasmxd/freya-sdk';
import { HomeAssistantClient } from './client.js';
import { HomeAssistantSecurityGateway } from './security.js';
import {
  HomeAssistantCallServiceTool,
  HomeAssistantGetStateTool,
  HomeAssistantListEntitiesTool,
  HomeAssistantListServicesTool
} from './tools.js';

/**
 * Home Assistant 智能家居交互工具箱插件
 * Home Assistant smart home interaction toolbox plugin
 */
export default class HomeAssistantPlugin implements ToolPlugin {
  type = 'tool' as const;

  private readonly client = new HomeAssistantClient();
  private readonly security = new HomeAssistantSecurityGateway();
  private readonly listTool = new HomeAssistantListEntitiesTool(this.client, this.security);
  private readonly getStateTool = new HomeAssistantGetStateTool(this.client, this.security);
  private readonly listServicesTool = new HomeAssistantListServicesTool(this.client);
  private readonly callServiceTool = new HomeAssistantCallServiceTool(this.client, this.security);

  async setup(ctx: FreyaContext): Promise<void> {
    this.security.setContext(ctx);
    this.client.startBackgroundSync(60_000);
  }

  async stop(ctx: FreyaContext): Promise<void> {
    this.client.stopBackgroundSync();
  }

  getId(): string {
    return 'homeassistant';
  }

  getInstructionPrompt(): string {
    return 'plugin.prompt.homeassistant';
  }

  getTools(): FreyaTool[] {
    const tools: FreyaTool[] = [
      this.listTool,
      this.getStateTool
    ];

    if (this.security.isControlAllowed()) {
      tools.push(this.listServicesTool);
      tools.push(this.callServiceTool);
    }

    return tools;
  }
}

export const Plugin = HomeAssistantPlugin;
