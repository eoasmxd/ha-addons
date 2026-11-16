# ACME Nano Documentation · 使用文档

> 📖 **中文文档**: [DOCS.zh.md on GitHub](https://github.com/eoasmxd/ha-addons/blob/main/acme-nano/DOCS.zh.md)

A lightweight Let's Encrypt DNS-01 SSL certificate client for Home Assistant.

> **Upstream Project**: For protocol details and standalone binaries, see [acme-nano on GitHub](https://github.com/eoasmxd/acme-nano).

### Quick Start

1. Go to the **Configuration** tab of the **ACME Nano (Let's Encrypt)** app.
2. Configure the global DNS provider and credentials:
   - **`dns_provider`**: Select your DNS provider (`cloudflare`, `aliyun`, `dnspod`, `aws`, `gd`, `dgon`, `gcloud`, `namecheap`, `azure`, `ovh`, `hetznercloud`, `duckdns`, `porkbun`, `namesilo`, or `vultr`).
   - **`dns_id`**: API ID / Key ID required by your provider (leave empty if not required; see the reference table below).
   - **`dns_secret`**: API Secret / Token for your provider (see the reference table below).
   - **`check_interval`**: Renewal check interval in hours (default: `24`, range: `1`–`720`).
3. Configure one or more certificate entries under **`certificates`**:
   - **`enabled`**: Whether to enable this certificate entry (default: `true`).
   - **`domains`**: Comma-separated domain list (e.g. `example.com,*.example.com`).
   - **`dns_zone`**: Target DNS zone for your provider (see the reference table below).
   - **`certfile`**: Certificate chain output filename or path. Relative paths are placed under `/ssl/` (default: `fullchain.pem`).
   - **`keyfile`**: Private key output filename or path. Relative paths are placed under `/ssl/` (default: `privkey.pem`).
4. Click **Save** and start the app. The CA defaults to Let's Encrypt, and the ACME account key is persisted automatically at `/data/account.key`.

---

### DNS Provider Reference

| `dns_provider` | `dns_id` | `dns_secret` | `dns_zone` |
| :--- | :--- | :--- | :--- |
| `cloudflare` | - | Cloudflare API Token | Zone ID |
| `aliyun` | AccessKeyId | AccessKeySecret | Root domain (`example.com`) |
| `dnspod` | SecretId | SecretKey | Root domain (`example.com`) |
| `aws` | AWS Access Key ID | AWS Secret Access Key | Hosted Zone ID (`Z123456`) |
| `gd` | API Key | API Secret | Root domain (`example.com`) |
| `dgon` | - | DigitalOcean API Token | Root domain (`example.com`) |
| `gcloud` | GCP Project ID | OAuth2 Bearer Token / Service Account JSON | Managed Zone Name |
| `namecheap` | `ApiUser:ClientIp` (default `127.0.0.1`) | Namecheap API Key | Root domain (`example.com`) |
| `azure` | `TenantID/ClientID` | Client Secret | `SubscriptionID/ResourceGroup/ZoneName` |
| `ovh` | Application Key (`AK`) | `ApplicationSecret:ConsumerKey` (`AS:CK`) | Domain (`example.com` or `ovh-us/example.com`) |
| `hetznercloud` | - | Hetzner Cloud API Token | Root domain (`example.com`) |
| `duckdns` | - | DuckDNS Token | Optional (leave empty to auto-extract from `domains`) |
| `porkbun` | API Key | Secret API Key | Root domain (`example.com`) |
| `namesilo` | - | NameSilo API Key | Root domain (`example.com`) |
| `vultr` | - | Vultr API Key | Root domain (`example.com`) |
