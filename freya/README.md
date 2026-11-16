# Freya · 轻量级智能体系统

[![Home Assistant Version](https://img.shields.io/badge/Home%20Assistant-2026.2.0%2B-blue.svg)](https://www.home-assistant.io/)

[English](https://github.com/eoasmxd/ha-addons/blob/main/freya/README.md) | [简体中文](https://github.com/eoasmxd/ha-addons/blob/main/freya/README.zh.md)

A lightweight AI agent system based on a microkernel architecture with native Home Assistant integration.

---

### About

**Freya** is a lightweight, architecturally clear, and production-ready microkernel AI Agent system. Designed for smart interaction and agent development, it eliminates heavy container sandboxes and complex distributed RPCs in favor of a clean, monolithic microkernel—fully preserving modular plugin extensions, event-driven decoupling, and multi-channel interaction.

> ⚠️ **Prerequisite**: An LLM API Key (e.g. Google Gemini, DeepSeek, OpenAI, or local Ollama) is required. Please refer to the **Documentation** tab in Home Assistant for initial setup.

### ✨ Key Features

- 🔌 **Microkernel Architecture**: LLM providers, tools, and communication channels are decoupled via standard contracts with hot-reload support, keeping the core runtime lightweight.
- ⚡ **Event-Driven Decoupling**: High-concurrency, low-coupling streaming communication and telemetry via internal event bus.
- 📝 **Zero Hardcoded Prompts**: System identities, constraints, and plugin prompts are strictly separated into physical Markdown files, supporting dynamic cascading probes and disk overrides.
- 🏠 **Bidirectional Home Assistant Integration**: Seamlessly queries and controls Assist-exposed entities; pairs with the official integration with auto-discovery support for Assist conversation agent and `freya.chat` action.

---

> 🔗 Repositories: [Freya Core](https://github.com/eoasmxd/freya) | [HA Integration](https://github.com/eoasmxd/ha-integration-freya)
