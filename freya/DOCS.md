## English

A lightweight AI agent system based on a microkernel architecture with built-in Web interaction and automation channels.

### Quick Start

1. After installation, it is recommended to enable **"Show in sidebar"** and **"Start on boot"** on the add-on info page.
2. Click **"Start"**.
3. Click **"Freya"** in the Home Assistant sidebar to enter the Web UI for configuration and chat.
4. **LLM Configuration (Required on first launch)**:
   - Click **Settings ⚙️ -> LLM Providers -> Add Provider**: fill in the Provider ID, Base URL, and API Key.
     > *Note: If using Google Gemini, please first enable the **Gemini Plugin** under the **Plugins** tab (disabled by default).*
   - Select the added provider, click **Add Model**: enter the Model ID (e.g. `gemini-3.5-flash-lite`, `deepseek-v4-flash`, or `gpt-4o-mini`).
   - Go to **Global Config -> Category: "Models"**: under **Default Model Fallback Chain**, select the model and click **Bind**.
   - **Click the "Save Configuration" button** in the bottom-right corner to apply.
5. **Home Assistant Integration Setup (Assist & Automations)**:
   - On first launch, the add-on automatically deploys the official custom integration to `/config/custom_components/freya`.
   - Follow the persistent notification prompt to **restart Home Assistant**.
   - After restarting, navigate to **Settings -> Devices & Services** and click **Configure** on the discovered **Freya** integration (or click **Add Integration** and search for `Freya`).
   - Once added, select Freya in **Settings -> Voice assistants** as your Assist conversation agent, or call the `freya.chat` action in automations.

### Data Persistence

All data and configurations are persistently stored in **`/config/freya/`**:

- **Data & Memories**: `/config/freya/data/`
- **User Configurations**: `/config/freya/config/`

Data will not be lost across add-on upgrades or restarts. You can view or back up this directory directly using the File Editor or VS Code add-on.

### Home Assistant Integration & Security

This add-on features a built-in smart interaction toolbox dedicated to Home Assistant:
- **Entity Exposure Authorization**: The devices and sensors accessible to Freya strictly follow the entities you exposed to the conversation assistant (Assist) in the native Home Assistant interface (**Settings -> Voice assistants -> Expose**).
- **Device Control Switch**: Defaults to **Safe Read-Only Mode** (querying entity states only). To allow the agent to perform actions such as turning on/off switches and lights, enable the **"Allow agent to call device control services"** switch in the Freya Web UI under **Settings ⚙️ -> Global Config -> "Plugin Config: tool-homeassistant"** (takes effect dynamically without restarting the add-on).

---

## 简体中文

基于微内核架构的轻量级智能体系统，内置 Web 交互与自动化通道。

### 使用指引

1. 安装完成后，建议在应用主页开启 **“在侧边栏中显示”** 与 **“开机自启”**。
2. 点击 **“启动”**。
3. 在 Home Assistant 左侧菜单栏点击 **“Freya”**，即可进入图形化界面进行配置与对话。
4. **大模型配置（首次启动必做）**：
   - 点击右上角 **设置 ⚙️ -> LLM 提供商 -> 添加提供商**：填写提供商 ID、Base URL 和 API Key。
     > *注意：如需使用 Google Gemini 原生接口，需先在 **“插件配置”** 页签中启用 **Gemini 模型插件**（默认关闭）。*
   - 选中刚添加的提供商，点击 **添加模型**：填入模型 ID（如 `gemini-3.5-flash-lite`、`deepseek-v4-flash`、`gpt-4o-mini`）。
   - 切换到 **全局配置 -> 分类：“模型”**：在 **“默认模型降级链列表”** 下拉框中选中该模型，点击 **绑定**。
   - **点击右下角的【保存配置】按钮**即可生效并开始对话。
5. **集成添加与 Assist 接入（按需选做）**：
   - 应用启动时会自动将官方集成部署至 `/config/custom_components/freya`。
   - 按通知提示**重启 Home Assistant**。
   - 重启完成后进入 **设置 -> 设备与集成**，点击自动弹出的 **Freya** 进行配置确认（或点击右下角 **添加集成** 搜索 `Freya`）。
   - 添加成功后，即可在 **设置 -> 语音助手** 中将 Freya 选为 Assist 对话代理，或在自动化中直接调用 `freya.chat` 动作。

### 数据持久化

所有数据与配置均持久化保存在 **`/config/freya/`**：

- **数据与记忆**：`/config/freya/data/`
- **用户配置**：`/config/freya/config/`

升级或重启应用不会丢失数据。你可以通过 File Editor 或 VS Code 应用直接查看或备份该目录。

### Home Assistant 交互与安全性

本应用内置了 Home Assistant 专用智能交互工具箱：
- **实体暴露授权**：Freya 能够感知的设备与传感器实体，完全遵循你在 Home Assistant 原生界面（**设置 -> 语音助手 -> 暴露**）中勾选暴露给对话助手（Assist）的实体列表。
- **设备控制开关**：默认处于**安全只读模式**（仅允许查询实体状态）。如需允许智能体执行开关灯、控制开关等服务动作，请在 Freya Web 控制台的 **设置 ⚙️ -> 全局配置 -> “插件配置：tool-homeassistant”** 中开启 **“允许智能体调用设备控制服务”** 开关并保存（即时生效，无需重启加载项）。

