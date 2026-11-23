# S5Tunnel Server

[![Home Assistant Version](https://img.shields.io/badge/Home%20Assistant-2026.2.0%2B-blue.svg)](https://www.home-assistant.io/)

[English](README.md) | [简体中文](README.zh.md)

安全访问私有内网的加密代理隧道服务端。

---

### 关于

**S5Tunnel Server (`s5ts`)** 是一款基于纯 Go 标准库实现的轻量级 TLS 加密与 Token 认证代理隧道服务端，仅需对外保留单一安全入口，即可远程访问家中的 Home Assistant、NAS、路由器后台及局域网其他服务，无需将内网服务端口直接暴露至公网。

### ✨ 核心特性

- 🛡️ **单一加密入口**：全链路采用标准 TLS 加密与动态 Token 认证，零内网业务端口暴露。
- ⚡ **轻量高效**：纯 Go 标准库实现，低延迟且资源占用极低。
- 🛠️ **原生图形化配置**：直接通过 Home Assistant 应用选项完成配置，支持自动自签名证书或读取 `/ssl/` 自定义证书。

---

> 🔗 上游项目仓库：[s5tunnel](https://github.com/eoasmxd/s5tunnel)

