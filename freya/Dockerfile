ARG BUILD_FROM=ghcr.io/eoasmxd/freya:latest

FROM alpine/git:latest AS builder

WORKDIR /build
RUN LATEST_TAG=$(git ls-remote --tags --sort="v:refname" https://github.com/eoasmxd/ha-integration-freya.git | grep -v '\^{}' | tail -n1 | sed 's/.*\///') \
    && echo "Detected latest release tag: ${LATEST_TAG}" \
    && git clone --depth=1 --branch "${LATEST_TAG:-main}" https://github.com/eoasmxd/ha-integration-freya.git /build/integration-repo \
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

