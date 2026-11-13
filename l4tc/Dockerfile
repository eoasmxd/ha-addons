ARG BUILD_FROM=ghcr.io/eoasmxd/l4tc:latest
FROM ${BUILD_FROM}

RUN apk --no-cache add bash jq

WORKDIR /app

COPY run.sh /run.sh
COPY l4tc.ini.example /etc/l4tunnel/l4tc.ini.example

RUN chmod +x /run.sh

ENTRYPOINT []
CMD ["/run.sh"]

