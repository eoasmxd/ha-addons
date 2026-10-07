ARG BUILD_FROM=node:22-bookworm-slim

FROM ${BUILD_FROM} AS builder

WORKDIR /build/plugin-tool-homeassistant
COPY plugins/plugin-tool-homeassistant/package.json ./
RUN npm install --no-audit --no-fund
COPY plugins/plugin-tool-homeassistant/ ./
RUN npm run build && npm prune --production

WORKDIR /build
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates git \
    && git clone --depth=1 https://github.com/eoasmxd/ha-integration-freya.git /build/integration-repo \
    && mkdir -p /build/integration \
    && cp -r /build/integration-repo/custom_components/freya /build/integration/ \
    && rm -rf /build/integration-repo


FROM ${BUILD_FROM}

WORKDIR /app

ENV NODE_ENV=production \
    FREYA_HOME=/config/freya \
    FREYA_LAUNCH=/app

RUN npm install -g @eoasmxd/freya@0.7.2 --no-audit --no-fund

COPY --from=builder /build/plugin-tool-homeassistant/package.json /app/plugins/plugin-tool-homeassistant/
COPY --from=builder /build/plugin-tool-homeassistant/schema.json /app/plugins/plugin-tool-homeassistant/
COPY --from=builder /build/plugin-tool-homeassistant/dist /app/plugins/plugin-tool-homeassistant/dist
COPY --from=builder /build/plugin-tool-homeassistant/config /app/plugins/plugin-tool-homeassistant/config
COPY --from=builder /build/integration/freya /app/integration/custom_components/freya/

EXPOSE 3000

CMD ["freya", "--no-cli", "--foreground", "--no-auth", "--port", "3000"]
