# ACME Nano (Let's Encrypt)

[![Home Assistant Version](https://img.shields.io/badge/Home%20Assistant-2026.2.0%2B-blue.svg)](https://www.home-assistant.io/)

Lightweight Let's Encrypt DNS-01 SSL certificate client.
极简 Let's Encrypt DNS-01 证书自动签发与续期客户端。

---

### About

**ACME Nano (Let's Encrypt)** is a zero-dependency ACME v2 DNS-01 client built purely with the Go standard library. It automates issuing and renewing Let's Encrypt SSL/TLS certificates (including wildcard certificates) directly into Home Assistant's `/ssl` directory without exposing port 80/443.

### ✨ Key Features

- 🔒 **Zero-Dependency Core**: Powered by `acme-nano` built strictly on Go's standard library for easy security auditing.
- 🌐 **Multi-Domain & Wildcard Support**: Configure multiple certificate groups and request apex + wildcard domains (e.g. `example.com,*.example.com`) with serial DNS-01 challenge execution.
- 🔁 **Automatic Idempotent Renewal**: Periodically checks configured certificates and renews them automatically before expiry when fewer than 30 days remain.
- 🛠️ **Native UI Configuration**: Manage DNS provider credentials and certificate lists directly from the Home Assistant Configuration tab.

---

> 🔗 Upstream Repository: [acme-nano](https://github.com/eoasmxd/acme-nano)

---

### 关于

**ACME Nano (Let's Encrypt)** 基于纯 Go 标准库零依赖实现的 `acme-nano`，无需开放公网 `80`/`443` 端口，通过 DNS-01 验证全自动向 Home Assistant `/ssl` 目录签发与续期 Let's Encrypt SSL/TLS 证书（含泛域名证书）。

### ✨ 核心特性

- 🔒 **零外部依赖内核**：底层运行纯 Go 标准库编写的 `acme-nano`，代码结构精简、易于审计。
- 🌐 **多域与泛域名支持**：支持同时配置多组证书，串行验证并清理 TXT 记录，安全申请主域名与泛域名（如 `example.com,*.example.com`）。
- 🔁 **后台幂等自动续期**：按设定间隔定期巡检所有启用的证书，剩余有效期大于 30 天自动跳过，临期自动无感续签。
- 🛠️ **原生图形化配置**：直接通过 Home Assistant 应用配置页管理 DNS 凭证与证书列表。

---

> 🔗 上游项目仓库：[acme-nano](https://github.com/eoasmxd/acme-nano)

