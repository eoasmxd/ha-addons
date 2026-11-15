A lightweight Let's Encrypt DNS-01 SSL certificate client for Home Assistant.

> **Upstream Project**: For protocol details and standalone binaries, see [acme-nano on GitHub](https://github.com/eoasmxd/acme-nano).

### Quick Start

1. Go to the **Configuration** tab of the **ACME Nano (Let's Encrypt)** add-on.
2. Configure the global DNS provider and credentials:
   - **`dns_provider`**: Select your DNS provider (`cloudflare`, `aliyun`, or `dnspod`).
   - **`dns_id`**: API ID required by Aliyun (`AccessKeyId`) or Tencent Cloud DNSPod (`SecretId`). Leave empty for Cloudflare.
   - **`dns_secret`**: API Secret / Token (`API Token` for Cloudflare, `AccessKeySecret` for Aliyun, `SecretKey` for DNSPod).
   - **`check_interval`**: Renewal check interval in hours (default: `24`, range: `1`–`720`).
3. Configure one or more certificate entries under **`certificates`**:
   - **`enabled`**: Whether to enable this certificate entry (default: `true`).
   - **`domains`**: Comma-separated domain list (e.g. `example.com,*.example.com`).
   - **`dns_zone`**: Target DNS zone (Cloudflare **Zone ID**, or apex domain like `example.com` for Aliyun / DNSPod).
   - **`certfile`**: Certificate chain output filename or path. Relative paths are placed under `/ssl/` (default: `fullchain.pem`).
   - **`keyfile`**: Private key output filename or path. Relative paths are placed under `/ssl/` (default: `privkey.pem`).
4. Click **Save** and start the add-on. The CA defaults to Let's Encrypt, and the ACME account key is persisted automatically at `/data/account.key`.

| Provider | `dns_id` | `dns_secret` | `dns_zone` |
| :--- | :--- | :--- | :--- |
| `cloudflare` | Not required | Cloudflare API Token | Cloudflare Zone ID |
| `aliyun` | AccessKeyId | AccessKeySecret | Apex domain (e.g. `example.com`) |
| `dnspod` | SecretId | SecretKey | Apex domain (e.g. `example.com`) |

---

极简的 Home Assistant Let's Encrypt DNS-01 证书自动签发与续期应用。

> **上游项目**：关于协议细节与独立二进制使用方式，请参见 [GitHub 仓库](https://github.com/eoasmxd/acme-nano)。

### 使用指引

1. 进入 **ACME Nano (Let's Encrypt)** 应用的 **配置 (Configuration)** 页面。
2. 填写全局 DNS 服务商与凭证信息：
   - **`dns_provider`**：选择 DNS 解析服务商（支持 `cloudflare`、`aliyun`、`dnspod`）。
   - **`dns_id`**：阿里云（`AccessKeyId`）或腾讯云 DNSPod（`SecretId`）所需 ID，使用 Cloudflare 时留空即可。
   - **`dns_secret`**：对应服务商的密钥 / Token（Cloudflare 填写 `API Token`，阿里云填写 `AccessKeySecret`，DNSPod 填写 `SecretKey`）。
   - **`check_interval`**：证书检查与自动续期周期（单位：小时，默认 `24`，范围 `1`–`720`）。
3. 在 **`certificates`** 列表中配置需要签发的一个或多个域名证书：
   - **`enabled`**：是否启用该证书任务（默认 `true`）。
   - **`domains`**：逗号分隔的域名列表，支持泛域名（例如 `example.com,*.example.com`）。
   - **`dns_zone`**：目标解析区域（Cloudflare 填写 **Zone ID**；阿里云与 DNSPod 填写主域名，如 `example.com`）。
   - **`certfile`**：证书链输出路径，填写相对路径时默认存放在 `/ssl/` 目录下（默认 `fullchain.pem`）。
   - **`keyfile`**：证书私钥输出路径，填写相对路径时默认存放在 `/ssl/` 目录下（默认 `privkey.pem`）。
4. 点击 **保存 (Save)** 并启动应用。本应用默认使用 Let's Encrypt 作为发证机构，ACME 账户私钥将持久化保存于 `/data/account.key`。

| 服务商 (`dns_provider`) | `dns_id` | `dns_secret` | `dns_zone` |
| :--- | :--- | :--- | :--- |
| `cloudflare` | 无需填写 | Cloudflare API Token | Zone ID |
| `aliyun` | AccessKeyId | AccessKeySecret | 主域名（如 `example.com`） |
| `dnspod` | SecretId | SecretKey | 主域名（如 `example.com`） |

