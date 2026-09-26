ARG BUILD_FROM=node:22-bookworm-slim

# 构建阶段：编译 Home Assistant 专用插件
# Build stage: compile dedicated plugin for Home Assistant
FROM ${BUILD_FROM} AS builder

WORKDIR /build/plugin-tool-homeassistant
COPY plugins/plugin-tool-homeassistant/package.json ./
RUN npm install --no-audit --no-fund
COPY plugins/plugin-tool-homeassistant/ ./
RUN npm run build && npm prune --production

# 运行阶段
# Runtime stage
FROM ${BUILD_FROM}

WORKDIR /app

ENV NODE_ENV=production \
    FREYA_HOME=/config/freya \
    FREYA_LAUNCH=/app

RUN npm install -g @eoasmxd/freya@0.5.2 --no-audit --no-fund

# 注入专属插件至宿主插件目录（仅保留运行时所需元数据、提示词模板及编译产物）
# Inject dedicated plugin into host plugins directory (keep only runtime metadata, prompt templates, and build artifacts)
COPY --from=builder /build/plugin-tool-homeassistant/package.json /app/plugins/plugin-tool-homeassistant/
COPY --from=builder /build/plugin-tool-homeassistant/dist /app/plugins/plugin-tool-homeassistant/dist
COPY --from=builder /build/plugin-tool-homeassistant/config /app/plugins/plugin-tool-homeassistant/config

EXPOSE 3000

CMD ["freya", "--no-cli", "--foreground", "--port", "3000"]
