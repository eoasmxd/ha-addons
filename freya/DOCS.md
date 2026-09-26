[English](#english) | [简体中文](#简体中文)

---

<a id="english"></a>
## English

A lightweight AI agent system based on a microkernel architecture with built-in Web interaction and automation channels.

### Quick Start

1. After installation, it is recommended to enable **"Show in sidebar"** and **"Start on boot"** on the add-on info page.
2. Click **"Start"**.
3. Click **"Freya"** in the Home Assistant sidebar to enter the Web UI for configuration and chat.

### Data Persistence

All data and configurations are persistently stored in **`/config/freya/`**:

- **Data & Memories**: `/config/freya/data/`
- **User Configurations**: `/config/freya/config/`

Data will not be lost across add-on upgrades or restarts. You can view or back up this directory directly using the File Editor or VS Code add-on.

### Home Assistant Integration & Security

This add-on features a built-in smart interaction toolbox dedicated to Home Assistant:
- **Entity Exposure Authorization**: The devices and sensors accessible to Freya strictly follow the entities you exposed to the conversation assistant (Assist) in the native Home Assistant interface (**Settings -> Voice assistants -> Expose**).
- **Device Control Switch**: Defaults to **Safe Read-Only Mode** (querying entity states only). To allow the agent to perform actions such as turning on/off switches and lights, manually enable the device control switch in the Freya Web UI under **"System Settings" -> "Global Config"** (Category: **"Permissions & Security"**). Changes take effect immediately without restarting the add-on.

---

<a id="简体中文"></a>
## 简体中文

基于微内核架构的轻量级智能体系统，内置 Web 交互与自动化通道。

### 使用指引

1. 安装完成后，建议在应用主页开启 **“在侧边栏中显示”** 与 **“开机自启”**。
2. 点击 **“启动”**。
3. 在 Home Assistant 左侧菜单栏点击 **“Freya”**，即可进入图形化界面进行配置与对话。

### 数据持久化

所有数据与配置均持久化保存在 **`/config/freya/`**：

- **数据与记忆**：`/config/freya/data/`
- **用户配置**：`/config/freya/config/`

升级或重启应用不会丢失数据。你可以通过 File Editor 或 VS Code 应用直接查看或备份该目录。

### Home Assistant 交互与安全性

本应用内置了 Home Assistant 专用智能交互工具箱：
- **实体暴露授权**：Freya 能够感知的设备与传感器实体，完全遵循你在 Home Assistant 原生界面（**设置 -> 语音助手 -> 暴露**）中勾选暴露给对话助手（Assist）的实体列表。
- **设备控制开关**：默认处于**安全只读模式**（仅允许查询实体状态）。如需允许智能体执行开关灯、控制开关等服务动作，请在 Freya Web 控制台的 **“系统设置” -> “全局配置”**（分类：**“权限与安全”**）中手动开启设备控制开关（即时生效，无需重启加载项）。

