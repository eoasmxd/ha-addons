# S5Tunnel Server 使用文档

[English](DOCS.md) | [简体中文](DOCS.zh.md)

安全访问私有内网的加密代理隧道服务端，无需将 Home Assistant 或局域网服务端口逐一暴露至公网。

> **前置要求**：需在随身电脑上配合 **S5Tunnel Client (`s5tc`)** 或 Windows 托盘程序 **S5Tunnel GUI (`s5tc-gui.exe`)** 连接使用。关于客户端配置、PAC 分流规则及 Nginx `stream` SNI 端口复用等进阶用法，请参见 [s5tunnel GitHub 仓库](https://github.com/eoasmxd/s5tunnel)。

### 快速开始

1. 进入 **S5Tunnel Server** 应用的 **“配置（Configuration）”** 页面。
2. 按需填写服务参数：
   - **`bind_addr`**：服务端监听的网卡 IP 地址（默认 `0.0.0.0`）。
   - **`bind_port`**：服务端监听端口（默认 `3017`）。
   - **`token`**：客户端接入认证令牌（对外暴露前请务必将默认值 `12345678` 修改为强密码）。
   - **`tls_cert_file`**：可选自定义 TLS 证书路径。与私钥路径同时留空时，系统将在内存中自动生成自签名证书；填写相对路径时默认从 `/ssl/` 目录读取。
   - **`tls_key_file`**：可选自定义 TLS 私钥路径。需与 `tls_cert_file` 同时填写或同时留空；填写相对路径时默认从 `/ssl/` 目录读取。
3. 点击 **“保存（Save）”** 并启动应用。

---

### Home Assistant 场景联动提示

- **配合 ACME Nano 使用自定义证书**：本应用以只读方式挂载了 `/ssl` 目录（`ssl:ro`）。若您使用同仓库的 **ACME Nano**（或其他写入 `/ssl/` 的证书工具）签发证书，只需在 `tls_cert_file` 和 `tls_key_file` 中直接填写相对文件名（如 `fullchain.pem` 与 `privkey.pem`）即可。
- **无公网 IP 时配合同机 L4Tunnel Client 联动**：由于 **S5Tunnel Server** 运行在宿主机网络（`host_network: true`），而 **L4Tunnel Client** 运行在默认桥接网络，请保持 `bind_addr` 为 `0.0.0.0`，并在 **L4Tunnel Client** 的 `tunnels` 规则中将 `local_ip` 填写为 Home Assistant 宿主机的局域网 IP、`local_port` 填写为 `bind_port`（默认 `3017`），切勿填写 `127.0.0.1`。

