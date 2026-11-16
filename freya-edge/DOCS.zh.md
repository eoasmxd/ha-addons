# Freya (Edge) 使用文档

[English](DOCS.md) | [简体中文](DOCS.zh.md)

基于微内核架构的轻量级智能体系统（Edge 先锋尝鲜通道），内置 Web 交互与自动化通道。

> ⚠️ **重要提示**：Freya 正式版与 Edge 版共用宿主机数据目录（`/config/freya/`）。启动 Edge 尝鲜版前，**请务必先停止或卸载已运行的正式版 Freya 应用**，两者切勿同时启动运行！

### 快速开始

1. 安装完成后，建议在应用主页开启 **“在侧边栏中显示”** 与 **“开机自启”**。
2. 点击 **“启动”**。
3. 在 Home Assistant 左侧菜单栏点击 **“Freya (Edge)”**，即可进入图形化界面进行配置与对话。
4. **大模型配置（首次启动必做）**：
   - 点击右上角 **设置 ⚙️ -> LLM 提供商 -> 添加提供商**：填写提供商 ID、Base URL 和 API Key。
     > *注意：如需使用 Google Gemini 原生接口，需先在 **“插件配置”** 页签中启用 **Gemini 模型插件**（默认关闭）。*
   - 选中刚添加的提供商，点击 **添加模型**：填入模型 ID（如 `gemini-3.5-flash-lite`、`deepseek-v4-flash`、`gpt-4o-mini`）。
   - 切换到 **全局配置 -> 分类：“模型”**：在 **“默认模型降级链列表”** 下拉框中选中该模型，点击 **绑定**。
   - **点击右下角的“保存配置”按钮**即可生效并开始对话。
5. **集成添加与 Assist 接入（按需选做）**：
   - 请先安装 **Freya AI Agent** 集成：

     [![在 Marketplace 中打开此存储库](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=eoasmxd&repository=ha-integration-freya)

     *（点击上方徽章一键直达下载，或在 **HACS** 中搜索 **Freya** 安装）*
   - 安装完成后**重启 Home Assistant**。
   - 重启完成后进入 **设置 -> 设备与服务**，点击自动发现的 **Freya** 进行配置确认（或点击右下角 **添加集成** 搜索 `Freya`）。
   - 添加成功后，即可在 **设置 -> 语音助手** 中将 Freya 选为 Assist 对话代理，或在自动化中直接调用 `freya.chat` 动作。

### 微信接入（按需选做）

1. 在右上角 **设置 ⚙️ -> 插件配置** 中开启 **微信频道插件**。
2. 无需任何网页配置，直接在对话框中输入并发送：`/weixin login my_bot`
3. 系统会弹出一个二维码，使用手机微信扫码即可上线。

> **💡 智能助手提示**：遇到任何问题、想了解更多使用技巧或高级配置，**请直接在对话中问 Freya**，她什么都懂！

### 数据持久化

所有数据与配置均持久化保存在 **`/config/freya/`**：

- **数据与记忆**：`/config/freya/data/`
- **用户配置**：`/config/freya/config/`

升级或重启应用不会丢失数据。你可以通过 File Editor 或 VS Code 应用直接查看或备份该目录。

### Home Assistant 交互与安全性

本应用内置了 Home Assistant 专用智能交互工具箱：
- **实体暴露授权**：Freya 能够感知的设备与传感器实体，完全遵循你在 Home Assistant 原生界面（**设置 -> 语音助手 -> 暴露**）中勾选暴露给对话助手（Assist）的实体列表。
- **设备控制开关**：默认处于**安全只读模式**（仅允许查询实体状态）。如需允许智能体执行开关灯、控制开关等服务动作，请在 Freya Web 控制台的 **设置 ⚙️ -> 全局配置 -> “插件配置：tool-homeassistant”** 中开启 **“允许智能体调用设备控制服务”** 开关并保存（即时生效，无需重启应用）。

