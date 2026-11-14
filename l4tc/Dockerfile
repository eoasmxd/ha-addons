ARG BUILD_FROM=ghcr.io/eoasmxd/l4tc:latest
FROM ${BUILD_FROM}

RUN apk --no-cache add bash jq

WORKDIR /app
COPY run.sh /run.sh
RUN chmod +x /run.sh

ENTRYPOINT []
CMD ["/run.sh"]

