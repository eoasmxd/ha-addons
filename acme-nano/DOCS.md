A lightweight Let's Encrypt DNS-01 SSL certificate client for Home Assistant.

> **Upstream Project**: For protocol details and standalone binaries, see [acme-nano on GitHub](https://github.com/eoasmxd/acme-nano).

### Quick Start

1. Go to the **Configuration** tab of the **ACME Nano (Let's Encrypt)** add-on.
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
4. Click **Save** and start the add-on. The CA defaults to Let's Encrypt, and the ACME account key is persisted automatically at `/data/account.key`.

---

极简的 Home Assistant Let's Encrypt DNS-01 证书自动签发与续期应用。

> **上游项目**：关于协议细节与独立二进制使用方式，请参见 [GitHub 仓库](https://github.com/eoasmxd/acme-nano)。

### 使用指引

1. 进入 **ACME Nano (Let's Encrypt)** 应用的 **配置 (Configuration)** 页面。
2. 填写全局 DNS 服务商与凭证信息：
   - **`dns_provider`**：选择 DNS 解析服务商（支持 `cloudflare`、`aliyun`、`dnspod`、`aws`、`gd`、`dgon`、`gcloud`、`namecheap`、`azure`、`ovh`、`hetznercloud`、`duckdns`、`porkbun`、`namesilo`、`vultr`）。
   - **`dns_id`**：服务商所需的 API ID / Key ID（无需填写的厂商留空即可，详见下表）。
   - **`dns_secret`**：对应服务商的密钥 / Token（详见下表）。
   - **`check_interval`**：证书检查与自动续期周期（单位：小时，默认 `24`，范围 `1`–`720`）。
3. 在 **`certificates`** 列表中配置需要签发的一个或多个域名证书：
   - **`enabled`**：是否启用该证书任务（默认 `true`）。
   - **`domains`**：逗号分隔的域名列表，支持泛域名（例如 `example.com,*.example.com`）。
   - **`dns_zone`**：目标解析区域（详见下表）。
   - **`certfile`**：证书链输出路径，填写相对路径时默认存放在 `/ssl/` 目录下（默认 `fullchain.pem`）。
   - **`keyfile`**：证书私钥输出路径，填写相对路径时默认存放在 `/ssl/` 目录下（默认 `privkey.pem`）。
4. 点击 **保存 (Save)** 并启动应用。本应用默认使用 Let's Encrypt 作为发证机构，ACME 账户私钥将持久化保存于 `/data/account.key`。

---

### Provider Reference / 服务商参数对照表

| `dns_provider` | `dns_id` | `dns_secret` | `dns_zone` |
| :--- | :--- | :--- | :--- |
| `cloudflare` | - | Cloudflare API Token | Zone ID |
| `aliyun` | AccessKeyId | AccessKeySecret | Domain / 主域名 (`example.com`) |
| `dnspod` | SecretId | SecretKey | Domain / 主域名 (`example.com`) |
| `aws` | AWS Access Key ID | AWS Secret Access Key | Hosted Zone ID (`Z123456`) |
| `gd` | API Key | API Secret | Domain / 主域名 (`example.com`) |
| `dgon` | - | DigitalOcean API Token | Domain / 主域名 (`example.com`) |
| `gcloud` | GCP Project ID | OAuth2 Bearer Token / Service Account JSON | Managed Zone Name |
| `namecheap` | `ApiUser:ClientIp` (default `127.0.0.1`) | Namecheap API Key | Domain / 主域名 (`example.com`) |
| `azure` | `TenantID/ClientID` | Client Secret | `SubscriptionID/ResourceGroup/ZoneName` |
| `ovh` | Application Key (`AK`) | `ApplicationSecret:ConsumerKey` (`AS:CK`) | Domain (`example.com` or `ovh-us/example.com`) |
| `hetznercloud` | - | Hetzner Cloud API Token | Domain / 主域名 (`example.com`) |
| `duckdns` | - | DuckDNS Token | Optional / 可选 (leave empty to auto-extract from `domains`) |
| `porkbun` | API Key | Secret API Key | Domain / 主域名 (`example.com`) |
| `namesilo` | - | NameSilo API Key | Domain / 主域名 (`example.com`) |
| `vultr` | - | Vultr API Key | Domain / 主域名 (`example.com`) |

