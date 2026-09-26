ARG BUILD_FROM=node:22-bookworm-slim

FROM ${BUILD_FROM} AS builder

WORKDIR /build/plugin-tool-homeassistant
COPY plugins/plugin-tool-homeassistant/package.json ./
RUN npm install --no-audit --no-fund
COPY plugins/plugin-tool-homeassistant/ ./
RUN npm run build && npm prune --production


FROM ${BUILD_FROM}

WORKDIR /app

ENV NODE_ENV=production \
    FREYA_HOME=/config/freya \
    FREYA_LAUNCH=/app

RUN npm install -g @eoasmxd/freya@0.6.1 --no-audit --no-fund

COPY --from=builder /build/plugin-tool-homeassistant/package.json /app/plugins/plugin-tool-homeassistant/
COPY --from=builder /build/plugin-tool-homeassistant/dist /app/plugins/plugin-tool-homeassistant/dist
COPY --from=builder /build/plugin-tool-homeassistant/config /app/plugins/plugin-tool-homeassistant/config

EXPOSE 3000

CMD ["freya", "--no-cli", "--foreground", "--port", "3000"]
