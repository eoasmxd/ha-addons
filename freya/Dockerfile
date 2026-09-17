ARG BUILD_FROM=node:22-bookworm-slim
FROM ${BUILD_FROM}

WORKDIR /app

ENV NODE_ENV=production \
    FREYA_HOME=/config/freya \
    FREYA_WORKSPACE=/app

RUN npm install -g @eoasmxd/freya@latest --no-audit --no-fund

EXPOSE 3000

CMD ["freya", "--no-cli", "--foreground"]
