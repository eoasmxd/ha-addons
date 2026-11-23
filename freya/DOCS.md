# Freya Documentation

> 📖 **中文文档**: [DOCS.zh.md on GitHub](https://github.com/eoasmxd/ha-addons/blob/main/freya/DOCS.zh.md)

A lightweight AI agent system based on a microkernel architecture with built-in Web interaction and automation channels.

### Quick Start

1. After installation, it is recommended to enable **"Show in sidebar"** and **"Start on boot"** on the app info page.
2. Click **"Start"**.
3. Click **"Freya"** in the Home Assistant sidebar to enter the Web UI for configuration and chat.
4. **LLM Configuration (Required on first launch)**:
   - Click **Settings ⚙️ -> LLM Providers -> Add Provider**: fill in the Provider ID, Base URL, and API Key.
     > *Note: If using Google Gemini, please first enable the **Gemini Plugin** under the **Plugins** tab (disabled by default).*
   - Select the added provider, click **Add Model**: enter the Model ID (e.g. `gemini-3.5-flash-lite`, `deepseek-v4-flash`, or `gpt-4o-mini`).
   - Go to **Global Config -> Category: "Models"**: under **Default Model Fallback Chain**, select the model and click **Bind**.
   - **Click the "Save Configuration" button** in the bottom-right corner to apply.
5. **Home Assistant Integration Setup (Assist & Automations)**:
   - Install the official **Freya AI Agent** integration:

     [![Open your Home Assistant instance and open a repository in the Marketplace.](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=eoasmxd&repository=ha-integration-freya)

     *(Click the badge above to download via My Home Assistant, or open **HACS** and search for **Freya**)*
   - Restart Home Assistant.
   - After restarting, navigate to **Settings -> Devices & Services** and click **Configure** on the discovered **Freya** integration (or click **Add Integration** and search for `Freya`).
   - Once added, select Freya in **Settings -> Voice assistants** as your Assist conversation agent, or call the `freya.chat` action in automations.

### Telegram Integration (Optional)

1. Enable the **Telegram Channel Plugin** in the **Plugins** tab.
2. Get a Bot Token from `@BotFather` on Telegram.
3. In Freya's chat box, simply type: *"Help me setup Telegram with token: YOUR_TOKEN"*.

> **💡 Pro Tip**: For any advanced configurations or more usage tips, **just ask Freya directly in the chat**. She knows it all!

### Data Persistence

All data and configurations are persistently stored in **`/config/freya/`**:

- **Data & Memories**: `/config/freya/data/`
- **User Configurations**: `/config/freya/config/`

Data will not be lost across app upgrades or restarts. You can view or back up this directory directly using the File Editor or VS Code app.

### Home Assistant Integration & Security

This app features a built-in smart interaction toolbox dedicated to Home Assistant:
- **Entity Exposure Authorization**: The devices and sensors accessible to Freya strictly follow the entities you exposed to the conversation assistant (Assist) in the native Home Assistant interface (**Settings -> Voice assistants -> Expose**).
- **Device Control Switch**: Defaults to **Safe Read-Only Mode** (querying entity states only). To allow the agent to perform actions such as turning on/off switches and lights, enable the **"Allow agent to call device control services"** switch in the Freya Web UI under **Settings ⚙️ -> Global Config -> "Plugin Config: tool-homeassistant"** (takes effect dynamically without restarting the app).
