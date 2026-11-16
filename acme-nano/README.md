# ACME Nano (Let's Encrypt) · 极简证书客户端

[![Home Assistant Version](https://img.shields.io/badge/Home%20Assistant-2026.2.0%2B-blue.svg)](https://www.home-assistant.io/)

[English](https://github.com/eoasmxd/ha-addons/blob/main/acme-nano/README.md) | [简体中文](https://github.com/eoasmxd/ha-addons/blob/main/acme-nano/README.zh.md)

Lightweight Let's Encrypt DNS-01 SSL certificate client.

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
