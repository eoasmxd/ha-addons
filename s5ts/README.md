# S5Tunnel Server · 安全访问内网的加密代理隧道服务端

[![Home Assistant Version](https://img.shields.io/badge/Home%20Assistant-2026.2.0%2B-blue.svg)](https://www.home-assistant.io/)

[English](https://github.com/eoasmxd/ha-addons/blob/main/s5ts/README.md) | [简体中文](https://github.com/eoasmxd/ha-addons/blob/main/s5ts/README.zh.md)

Encrypted proxy tunnel server for secure remote access to private networks.

---

### About

**S5Tunnel Server (`s5ts`)** is a lightweight TLS-encrypted and token-authenticated proxy tunnel server implemented purely with the Go standard library. It exposes a single secure entry point so you can remotely access your Home Assistant instance, NAS, router admin pages, and internal subnet services without exposing internal ports directly to the internet.

### ✨ Key Features

- 🛡️ **Single Encrypted Entry Point**: Standard TLS encryption with dynamic token authentication and zero internal port exposure.
- ⚡ **Lightweight & Fast**: Pure Go standard library implementation with low latency and minimal resource usage.
- 🛠️ **Native UI Configuration**: Seamless configuration directly via Home Assistant app options, with optional custom TLS certificates from `/ssl/`.

---

> 🔗 Upstream Repository: [s5tunnel](https://github.com/eoasmxd/s5tunnel)

