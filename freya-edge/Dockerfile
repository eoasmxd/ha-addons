ARG BUILD_FROM=ghcr.io/eoasmxd/freya:edge

FROM ${BUILD_FROM}

WORKDIR /app

ENV NODE_ENV=production \
    FREYA_HOME=/config/freya \
    FREYA_LAUNCH=/app

COPY config/ /app/config/

EXPOSE 3000

CMD ["freya", "--no-cli", "--foreground", "--no-auth", "--port", "3000"]
