# ACME Nano 使用文档

[English](DOCS.md) | [简体中文](DOCS.zh.md)

零依赖、易审计的 Home Assistant Let's Encrypt DNS-01 证书客户端。

> **上游项目**：关于协议细节与独立二进制使用方式，请参见 [GitHub 仓库](https://github.com/eoasmxd/acme-nano)。

### 快速开始

1. 进入 **ACME Nano (Let's Encrypt)** 应用的 **“配置（Configuration）”** 页面。
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
4. 点击 **“保存（Save）”** 并启动应用。本应用默认使用 Let's Encrypt 作为发证机构，ACME 账户私钥将持久化保存于 `/data/account.key`。

---

### 服务商参数对照表

| `dns_provider`（服务商） | `dns_id` | `dns_secret` | `dns_zone` |
| :--- | :--- | :--- | :--- |
| `cloudflare`（Cloudflare） | - | API Token | Zone ID |
| `aliyun`（阿里云） | AccessKeyId | AccessKeySecret | 主域名（`example.com`） |
| `dnspod`（腾讯云 DNSPod） | SecretId | SecretKey | 主域名（`example.com`） |
| `aws`（AWS Route 53） | Access Key ID | Secret Access Key | Hosted Zone ID（`Z123456`） |
| `gd`（GoDaddy） | API Key | API Secret | 主域名（`example.com`） |
| `dgon`（DigitalOcean） | - | API Token | 主域名（`example.com`） |
| `gcloud`（Google Cloud DNS） | Project ID | OAuth2 Bearer Token / Service Account JSON | Managed Zone Name |
| `namecheap`（Namecheap） | `ApiUser:ClientIp`（默认 `127.0.0.1`） | API Key | 主域名（`example.com`） |
| `azure`（Azure DNS） | `TenantID/ClientID` | Client Secret | `SubscriptionID/ResourceGroup/ZoneName` |
| `ovh`（OVHcloud） | Application Key（`AK`） | `ApplicationSecret:ConsumerKey`（`AS:CK`） | 主域名（`example.com` 或 `ovh-us/example.com`） |
| `hetznercloud`（Hetzner Cloud） | - | API Token | 主域名（`example.com`） |
| `duckdns`（DuckDNS） | - | Token | 可选（留空时自动从 `domains` 提取） |
| `porkbun`（Porkbun） | API Key | Secret API Key | 主域名（`example.com`） |
| `namesilo`（NameSilo） | - | API Key | 主域名（`example.com`） |
| `vultr`（Vultr） | - | API Key | 主域名（`example.com`） |

