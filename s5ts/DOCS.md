# S5Tunnel Server Documentation

> 📖 **中文文档**: [DOCS.zh.md on GitHub](https://github.com/eoasmxd/ha-addons/blob/main/s5ts/DOCS.zh.md)

An encrypted proxy tunnel server for accessing your Home Assistant instance and local network services without exposing internal ports to the public internet.

> **Prerequisites**: Connect using **S5Tunnel Client (`s5tc`)** or the Windows tray app **S5Tunnel GUI (`s5tc-gui.exe`)** on your remote device. For client setup, PAC routing rules, and Nginx `stream` SNI multiplexing guides, see [s5tunnel on GitHub](https://github.com/eoasmxd/s5tunnel).

### Quick Start

1. Go to the **Configuration** tab of the **S5Tunnel Server** app.
2. Adjust the server settings as needed:
   - **`bind_addr`**: IP address to listen on (default: `0.0.0.0`).
   - **`bind_port`**: Listening port (default: `3017`).
   - **`token`**: Authentication password required for clients (change the default `12345678` to a strong token before exposing publicly).
   - **`tls_cert_file`**: Optional TLS certificate path. Leave both certificate and key empty to auto-generate an in-memory self-signed certificate. Relative paths resolve under `/ssl/`.
   - **`tls_key_file`**: Optional TLS private key path. Must be configured together with `tls_cert_file` (or both left empty). Relative paths resolve under `/ssl/`.
3. Click **Save** and start the app.

---

### Home Assistant Integration Tips

- **Using Certificates from ACME Nano**: This app mounts `/ssl` as read-only (`ssl:ro`). If you issue certificates with **ACME Nano** (or another certificate add-on writing to `/ssl/`), simply enter relative filenames such as `fullchain.pem` and `privkey.pem` in `tls_cert_file` and `tls_key_file`.
- **Behind CGNAT (Pairing with L4Tunnel Client on the Same Host)**: Because **S5Tunnel Server** runs with `host_network: true` while **L4Tunnel Client** runs on the default bridge network, keep `bind_addr` set to `0.0.0.0`. In **L4Tunnel Client**'s `tunnels` list, set `local_ip` to your Home Assistant host's LAN IP (rather than `127.0.0.1`) and `local_port` to `bind_port` (default `3017`).

