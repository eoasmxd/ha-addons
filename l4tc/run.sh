#!/bin/bash
set -e

CONFIG_DIR="/config/l4tunnel"
DEFAULT_CUSTOM_CONFIG="${CONFIG_DIR}/l4tc.ini"
EXAMPLE_FILE="${CONFIG_DIR}/l4tc.ini.example"

mkdir -p "${CONFIG_DIR}"

if [ ! -f "${EXAMPLE_FILE}" ]; then
    if [ -f "/etc/l4tunnel/l4tc.ini.example" ]; then
        cp /etc/l4tunnel/l4tc.ini.example "${EXAMPLE_FILE}"
    fi
fi

USE_CUSTOM=false
CUSTOM_CONFIG="${DEFAULT_CUSTOM_CONFIG}"

if [ -f "/data/options.json" ]; then
    USE_CUSTOM=$(jq -r '.use_custom_config // false' /data/options.json)
    CUSTOM_CONFIG=$(jq -r --arg def "${DEFAULT_CUSTOM_CONFIG}" '.custom_config_path // $def' /data/options.json)
fi

if [ "$USE_CUSTOM" = "true" ] || [ -f "$CUSTOM_CONFIG" ]; then
    echo "[INFO] Using custom configuration file: $CUSTOM_CONFIG"
    TARGET_CONFIG="$CUSTOM_CONFIG"
else
    echo "[INFO] Generating configuration from Home Assistant options..."
    TARGET_CONFIG="/tmp/l4tc.ini"

    SERVER_ADDR=$(jq -r '.server_addr // "127.0.0.1"' /data/options.json)
    SERVER_PORT=$(jq -r '.server_port // 3007' /data/options.json)
    TOKEN=$(jq -r '.token // ""' /data/options.json)
    LOG_LEVEL=$(jq -r '.log_level // "info"' /data/options.json)
    POOL_COUNT=$(jq -r '.pool_count // 5' /data/options.json)

    cat <<EOF > "$TARGET_CONFIG"
[common]
server_addr = ${SERVER_ADDR}
server_port = ${SERVER_PORT}
token = ${TOKEN}
log_level = ${LOG_LEVEL}
pool_count = ${POOL_COUNT}

EOF

    TUNNEL_COUNT=$(jq '.tunnels // [] | length' /data/options.json)
    for (( i=0; i<$TUNNEL_COUNT; i++ )); do
        NAME=$(jq -r ".tunnels[$i].name" /data/options.json)
        LOCAL_IP=$(jq -r ".tunnels[$i].local_ip // \"127.0.0.1\"" /data/options.json)
        LOCAL_PORT=$(jq -r ".tunnels[$i].local_port" /data/options.json)
        REMOTE_PORT=$(jq -r ".tunnels[$i].remote_port" /data/options.json)
        HEALTH_CHECK=$(jq -r ".tunnels[$i].health_check // empty" /data/options.json)

        cat <<EOF >> "$TARGET_CONFIG"
[${NAME}]
local_ip = ${LOCAL_IP}
local_port = ${LOCAL_PORT}
remote_port = ${REMOTE_PORT}
EOF
        if [ -n "$HEALTH_CHECK" ]; then
            echo "health_check = ${HEALTH_CHECK}" >> "$TARGET_CONFIG"
        fi
        echo "" >> "$TARGET_CONFIG"
    done
fi

echo "[INFO] Starting l4tc with configuration: $TARGET_CONFIG"
exec /usr/local/bin/l4tc -c "$TARGET_CONFIG"

