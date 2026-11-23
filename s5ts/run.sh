#!/bin/bash
set -e

CONFIG_FILE="/tmp/s5ts.ini"

trim_whitespace() {
    local value="$1"
    value="${value#"${value%%[![:space:]]*}"}"
    value="${value%"${value##*[![:space:]]}"}"
    printf '%s' "$value"
}

BIND_ADDR=$(trim_whitespace "$(jq -r '.bind_addr // "0.0.0.0"' /data/options.json)")
BIND_PORT=$(jq -r '.bind_port // 3017' /data/options.json)
TOKEN=$(jq -r '.token // ""' /data/options.json)
TLS_CERT_FILE=$(trim_whitespace "$(jq -r '.tls_cert_file // ""' /data/options.json)")
TLS_KEY_FILE=$(trim_whitespace "$(jq -r '.tls_key_file // ""' /data/options.json)")

if [ -z "$BIND_ADDR" ]; then
    BIND_ADDR="0.0.0.0"
fi

if [ -z "$TOKEN" ]; then
    echo "[ERROR] Authentication token cannot be empty. Please set token in the app configuration." >&2
    exit 1
fi

if [ "$TOKEN" = "12345678" ]; then
    echo "[WARN] Using default authentication token (12345678). Please change it to a strong token before exposing publicly."
fi

if [ -n "$TLS_CERT_FILE" ] && [[ "$TLS_CERT_FILE" != /* ]]; then
    TLS_CERT_FILE="/ssl/${TLS_CERT_FILE}"
fi

if [ -n "$TLS_KEY_FILE" ] && [[ "$TLS_KEY_FILE" != /* ]]; then
    TLS_KEY_FILE="/ssl/${TLS_KEY_FILE}"
fi

if { [ -n "$TLS_CERT_FILE" ] && [ -z "$TLS_KEY_FILE" ]; } || { [ -z "$TLS_CERT_FILE" ] && [ -n "$TLS_KEY_FILE" ]; }; then
    echo "[ERROR] tls_cert_file and tls_key_file must be set together or both left empty." >&2
    exit 1
fi

umask 077
cat <<EOF > "$CONFIG_FILE"
[common]
bind_addr = ${BIND_ADDR}
bind_port = ${BIND_PORT}
token = ${TOKEN}
EOF

if [ -n "$TLS_CERT_FILE" ] && [ -n "$TLS_KEY_FILE" ]; then
    cat <<EOF >> "$CONFIG_FILE"
tls_cert_file = ${TLS_CERT_FILE}
tls_key_file = ${TLS_KEY_FILE}
EOF
fi

echo "[INFO] Starting s5ts with configuration: $CONFIG_FILE"
exec /usr/local/bin/s5ts -c "$CONFIG_FILE"

