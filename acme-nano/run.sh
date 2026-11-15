#!/bin/bash

# 读取全局 DNS 与自动续期配置
DNS_PROVIDER=$(jq -r '.dns_provider // "cloudflare"' /data/options.json)
DNS_ID=$(jq -r '.dns_id // ""' /data/options.json)
DNS_SECRET=$(jq -r '.dns_secret // ""' /data/options.json)
CHECK_INTERVAL=$(jq -r '.check_interval // 24' /data/options.json)

case "$DNS_PROVIDER" in
    cloudflare)
        ACME_BIN="/usr/local/bin/acme-cf"
        ;;
    aliyun|dnspod|aws|gd|dgon|gcloud|namecheap|azure|ovh|hetznercloud|duckdns|porkbun|namesilo|vultr)
        ACME_BIN="/usr/local/bin/acme-${DNS_PROVIDER}"
        ;;
    *)
        echo "[ERROR] Unsupported dns_provider: $DNS_PROVIDER"
        exit 1
        ;;
esac

export DNS_ID
export DNS_SECRET

mkdir -p /ssl /data

while true; do
    CERT_COUNT=$(jq '.certificates // [] | length' /data/options.json)
    echo "[INFO] Starting Let's Encrypt certificate check (${CERT_COUNT} configured, provider: ${DNS_PROVIDER})..."

    for (( i=0; i<$CERT_COUNT; i++ )); do
        ENABLED=$(jq -r ".certificates[$i].enabled" /data/options.json)
        if [ "$ENABLED" = "false" ]; then
            continue
        fi

        DOMAINS=$(jq -r ".certificates[$i].domains // \"\"" /data/options.json)
        DNS_ZONE=$(jq -r ".certificates[$i].dns_zone // \"\"" /data/options.json)
        CERTFILE=$(jq -r ".certificates[$i].certfile // \"fullchain.pem\"" /data/options.json)
        KEYFILE=$(jq -r ".certificates[$i].keyfile // \"privkey.pem\"" /data/options.json)

        if [[ "$CERTFILE" != /* ]]; then
            CERT_PATH="/ssl/${CERTFILE}"
        else
            CERT_PATH="$CERTFILE"
        fi

        if [[ "$KEYFILE" != /* ]]; then
            KEY_PATH="/ssl/${KEYFILE}"
        else
            KEY_PATH="$KEYFILE"
        fi

        mkdir -p "$(dirname "$CERT_PATH")" "$(dirname "$KEY_PATH")"

        export DNS_ZONE
        echo "[INFO] Processing certificate for domains: ${DOMAINS} -> ${CERT_PATH}"
        "$ACME_BIN" \
            -ca letsencrypt \
            -account /data/account.key \
            -d "$DOMAINS" \
            -cert "$CERT_PATH" \
            -key "$KEY_PATH" || echo "[ERROR] Failed to process certificate for domains: ${DOMAINS}"
    done

    echo "[INFO] Certificate check finished. Sleeping for ${CHECK_INTERVAL} hour(s)..."
    sleep "$((CHECK_INTERVAL * 3600))"
done

