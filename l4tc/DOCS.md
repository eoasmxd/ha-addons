A Layer 4 TCP reverse proxy tunnel client.

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

### Advanced Configuration (Custom INI File)

If you prefer to maintain the native INI configuration file directly:

1. The add-on mounts the HA configuration directory to `/config/l4tunnel/`.
2. On first start, a template file `/config/l4tunnel/l4tc.ini.example` is automatically generated.
3. Copy or rename it to `/config/l4tunnel/l4tc.ini` and modify it with **File Editor** or **Studio Code Server**.
4. Set **`use_custom_config: true`** in the Configuration tab (or keep the default path `/config/l4tunnel/l4tc.ini`).
5. Restart the add-on to apply changes.

---

四层 TCP 反向代理内网穿透客户端。

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

### 高级配置模式（外部 INI 文件）

如果您习惯直接编写原生 INI 配置文件：

1. 应用已挂载 Home Assistant 存储目录到 `/config/l4tunnel/`。
2. 首次启动时，会自动生成示例文件 `/config/l4tunnel/l4tc.ini.example`。
3. 您可以使用 **File Editor** 或 **Studio Code Server** 插件，复制并创建 `/config/l4tunnel/l4tc.ini`。
4. 在应用配置界面中开启 **`use_custom_config: true`**（或保留默认路径 `/config/l4tunnel/l4tc.ini`）。
5. 重启应用即可直接加载外部 INI 配置。

