# L4Tunnel Client 使用文档

[English](DOCS.md) | [简体中文](DOCS.zh.md)

四层 TCP 反向代理内网穿透客户端。

> **前置要求**：本应用需要配合服务端 **L4Tunnel Server (`l4ts`)** 使用。服务端部署与安装指南请参见 [GitHub 仓库](https://github.com/eoasmxd/l4tunnel)。

### 快速开始

1. 进入 **L4Tunnel Client** 应用的 **“配置（Configuration）”** 页面。
2. 填写连接参数：
   - **`server_addr`**：L4Tunnel Server 的公网 IP 地址或域名。
   - **`server_port`**：L4Tunnel Server 的服务端口（默认 `3007`）。
   - **`token`**：连接认证令牌，需与服务端配置保持一致。
3. 在 **`tunnels`** 列表中配置端口映射规则：
   - `name`：隧道名称（如 `ha`、`ssh`）。
   - `enabled`：是否启用该隧道映射（默认 `true`）。
   - `local_ip`：本地内网目标 IP（默认 `127.0.0.1`）。
   - `local_port`：需要映射的本地端口（例如 Home Assistant 默认端口 `8123`）。
   - `remote_port`：服务端对外暴露的远程访问端口。
   - `health_check`：是否开启 TCP 健康检查。
4. 点击 **“保存（Save）”** 并启动应用。

