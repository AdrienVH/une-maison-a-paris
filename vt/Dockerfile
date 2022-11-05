FROM debian:bullseye

RUN apt-get update && apt-get install --no-install-recommends --yes openjdk-17-jdk unzip wget zip && rm --recursive --force /var/lib/apt/lists/*

WORKDIR /opt/

RUN wget --quiet https://github.com/baremaps/baremaps/releases/download/v0.7.0/baremaps.zip && unzip /opt/baremaps.zip && rm -f /tmp/terraform.zip

ENV TILESET_PATH /opt/baremaps/tileset.json

ENV STYLE_PATH /opt/baremaps/style.json

EXPOSE 9000

COPY docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
