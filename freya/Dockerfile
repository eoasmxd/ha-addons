ARG BUILD_FROM=node:22-bookworm-slim
FROM ${BUILD_FROM}

WORKDIR /config/freya

ENV NODE_ENV=production \
    FREYA_HOME=/config/freya

RUN npm install -g @eoasmxd/freya@latest --no-audit --no-fund

EXPOSE 3000

CMD ["freya", "--no-cli", "--foreground"]
