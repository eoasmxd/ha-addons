ARG BUILD_FROM=node:22-bookworm-slim
FROM ${BUILD_FROM}

WORKDIR /app

ENV NODE_ENV=production \
    FREYA_HOME=/config/freya \
    FREYA_LAUNCH=/app

RUN npm install -g @eoasmxd/freya@0.5.2 --no-audit --no-fund

EXPOSE 3000

CMD ["freya", "--no-cli", "--foreground"]
