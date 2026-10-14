ARG BUILD_FROM=ghcr.io/eoasmxd/freya:edge

FROM alpine/git:latest AS builder

WORKDIR /build
RUN git clone --depth=1 --branch main https://github.com/eoasmxd/ha-integration-freya.git /build/integration-repo \
    && mkdir -p /build/integration \
    && cp -r /build/integration-repo/custom_components/freya /build/integration/ \
    && rm -rf /build/integration-repo


FROM ${BUILD_FROM}

WORKDIR /app

ENV NODE_ENV=production \
    FREYA_HOME=/config/freya \
    FREYA_LAUNCH=/app

COPY --from=builder /build/integration/freya /app/integration/custom_components/freya/
COPY config/ /app/config/

EXPOSE 3000

CMD ["freya", "--no-cli", "--foreground", "--no-auth", "--port", "3000"]
