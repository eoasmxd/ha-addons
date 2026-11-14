#!/bin/bash
set -e

CONFIG_FILE="/tmp/l4tc.ini"

SERVER_ADDR=$(jq -r '.server_addr // "127.0.0.1"' /data/options.json)
SERVER_PORT=$(jq -r '.server_port // 3007' /data/options.json)
TOKEN=$(jq -r '.token // ""' /data/options.json)
LOG_LEVEL=$(jq -r '.log_level // "info"' /data/options.json)
POOL_COUNT=$(jq -r '.pool_count // 5' /data/options.json)

cat <<EOF > "$CONFIG_FILE"
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

    cat <<EOF >> "$CONFIG_FILE"
[${NAME}]
local_ip = ${LOCAL_IP}
local_port = ${LOCAL_PORT}
remote_port = ${REMOTE_PORT}
EOF
    if [ -n "$HEALTH_CHECK" ]; then
        echo "health_check = ${HEALTH_CHECK}" >> "$CONFIG_FILE"
    fi
    echo "" >> "$CONFIG_FILE"
done

echo "[INFO] Starting l4tc with configuration: $CONFIG_FILE"
exec /usr/local/bin/l4tc -c "$CONFIG_FILE"
