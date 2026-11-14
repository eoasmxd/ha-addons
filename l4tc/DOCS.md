A Layer 4 TCP reverse proxy tunnel client.

> **Prerequisites**: This add-on requires a running `l4ts` server. For server deployment instructions, see [l4tunnel on GitHub](https://github.com/eoasmxd/l4tunnel).

### Quick Start

1. Go to the **Configuration** tab of the L4Tunnel Client add-on.
2. Fill in the connection settings:
   - **`server_addr`**: The public IP address or domain name of your `l4ts` server.
   - **`server_port`**: The service port of your `l4ts` server (default: `3007`).
   - **`token`**: The authentication password matching the server's token.
3. Configure your tunnels under **`tunnels`**:
   - `name`: Section name for the tunnel (e.g. `ha`, `ssh`).
   - `local_ip`: Target local IP (default: `127.0.0.1`).
   - `local_port`: Local service port to expose (e.g. `8123` for Home Assistant).
   - `remote_port`: Remote port allocated on the `l4ts` server.
   - `health_check`: Whether to enable TCP health checks.
4. Click **Save** and start the add-on.

---

四层 TCP 反向代理内网穿透客户端。

> **前置要求**：本应用需要配合 `l4ts` 服务端使用。服务端部署与安装指南请参见 [GitHub 仓库](https://github.com/eoasmxd/l4tunnel)。

### 使用指引

1. 进入 L4Tunnel Client 应用的 **配置 (Configuration)** 页面。
2. 填写连接参数：
   - **`server_addr`**：`l4ts` 服务端的公网 IP 地址或域名。
   - **`server_port`**：`l4ts` 服务端端口（默认 `3007`）。
   - **`token`**：连接认证 Token，需与服务端保持一致。
3. 在 **`tunnels`** 列表中配置端口映射规则：
   - `name`：隧道名称（如 `ha`、`ssh`）。
   - `local_ip`：本地内网目标 IP（默认 `127.0.0.1`）。
   - `local_port`：需要映射的本地端口（例如 Home Assistant 默认端口 `8123`）。
   - `remote_port`：服务端对外暴露的远程访问端口。
   - `health_check`：是否开启 TCP 健康检查。
4. 点击 **保存 (Save)** 并启动应用。
