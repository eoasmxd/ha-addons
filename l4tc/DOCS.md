# L4Tunnel Client Documentation · 使用文档

> 📖 **中文文档**: [DOCS.zh.md on GitHub](https://github.com/eoasmxd/ha-addons/blob/main/l4tc/DOCS.zh.md)

A Layer 4 TCP reverse proxy tunnel client.

> **Prerequisites**: This app requires a running **L4Tunnel Server (`l4ts`)**. For server deployment instructions, see [l4tunnel on GitHub](https://github.com/eoasmxd/l4tunnel).

### Quick Start

1. Go to the **Configuration** tab of the **L4Tunnel Client** app.
2. Fill in the connection settings:
   - **`server_addr`**: The public IP address or domain name of your L4Tunnel Server.
   - **`server_port`**: The service port of your L4Tunnel Server (default: `3007`).
   - **`token`**: The authentication password matching the server's token.
3. Configure your tunnels under **`tunnels`**:
   - `name`: Section name for the tunnel (e.g. `ha`, `ssh`).
   - `enabled`: Whether to enable this tunnel (default: `true`).
   - `local_ip`: Target local IP (default: `127.0.0.1`).
   - `local_port`: Local service port to expose (e.g. `8123` for Home Assistant).
   - `remote_port`: Remote port allocated on the L4Tunnel Server.
   - `health_check`: Whether to enable TCP health checks.
4. Click **Save** and start the app.
