ARG BUILD_FROM=node:22-bookworm-slim

FROM ${BUILD_FROM} AS builder

WORKDIR /build
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates git \
    && git clone --depth=1 https://github.com/eoasmxd/ha-integration-freya.git /build/integration-repo \
    && mkdir -p /build/integration \
    && cp -r /build/integration-repo/custom_components/freya /build/integration/ \
    && rm -rf /build/integration-repo


FROM ${BUILD_FROM}

ARG FREYA_VERSION=latest

WORKDIR /app

ENV NODE_ENV=production \
    FREYA_HOME=/config/freya \
    FREYA_LAUNCH=/app

RUN npm install -g @eoasmxd/freya@${FREYA_VERSION} --no-audit --no-fund

COPY --from=builder /build/integration/freya /app/integration/custom_components/freya/
COPY config/schema.json /app/config/schema.json

EXPOSE 3000

CMD ["freya", "--no-cli", "--foreground", "--no-auth", "--port", "3000"]
