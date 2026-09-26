# Freya

A lightweight AI agent system based on a microkernel architecture with native Home Assistant integration.  
基于微内核架构的轻量级智能体系统，支持 Home Assistant 原生交互。

---

## English

### About

**Freya** is a lightweight, architecturally clear, and production-ready microkernel AI Agent system. Designed for smart interaction and agent development, it eliminates heavy container sandboxes and complex distributed RPCs in favor of a clean, monolithic microkernel—fully preserving modular plugin extensions, event-driven decoupling, and multi-channel interaction.

### ✨ Key Features

- 🔌 **Microkernel Architecture**: LLM providers, tools, and communication channels are decoupled via standard contracts with hot-reload support, keeping the core runtime lightweight.
- ⚡ **Event-Driven Decoupling**: High-concurrency, low-coupling streaming communication and telemetry via internal event bus.
- 📝 **Zero Hardcoded Prompts**: System identities, constraints, and plugin prompts are strictly separated into physical Markdown files, supporting dynamic cascading probes and disk overrides.
- 🏠 **Native Home Assistant Integration**: Seamlessly integrates with entities exposed to Assist, supporting status queries and secure switch/device control.

---

> 📖 For detailed setup, persistence configuration, and permission controls, please see the **Documentation** tab.  
> 🔗 Project repository: [eoasmxd/freya](https://github.com/eoasmxd/freya)

---

## 简体中文

### 关于

**Freya** 是一个轻量级、架构清晰、生产可用的微内核智能体系统。专为智能家居场景与智能体学习设计，摒弃了繁重的容器沙箱与复杂的分布式 RPC 依赖，采用干净纯粹的单体微内核架构，完整实现插件化扩展、事件驱动解耦及多通道交互能力。

### ✨ 核心特性

- 🔌 **极致插件化 (Microkernel)**：大模型提供商、系统工具与通信频道基于标准接口外置解耦，支持即时热加载，底座极致轻量。
- ⚡ **事件驱动解耦 (Event-Driven)**：底座与插件之间采用事件总线进行高并发、低耦合的流式通信与调用追踪。
- 📝 **零硬编码提示词 (Zero-Hardcoded)**：系统人设与提示词物理脱离源码，通过三层级联探针与语言回退机制实现动态热更与用户落盘覆盖。
- 🏠 **原生 Home Assistant 深度打通**：无缝对接 Assist 暴露的实体状态感知与设备安全控制。

---

> 📖 详细使用指引、持久化路径与权限配置，请切换至顶部的 **“文档 (Documentation)”** 选项卡查看。  
> 🔗 项目仓库：[eoasmxd/freya](https://github.com/eoasmxd/freya)
