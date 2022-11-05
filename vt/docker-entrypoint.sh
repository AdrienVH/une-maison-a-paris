#!/bin/bash

JDBC_URL="jdbc:postgresql://${PGHOST}:${PGPORT:-5432}/${PGDATABASE}?user=${PGUSER}&password=${PGPASSWORD}"

TILESET_PATH=${BAREMAPS_TILESET_PATH:-/opt/baremaps/tileset.json}
echo "Tileset path: ${TILESET_PATH}"

STYLE_PATH=${BAREMAPS_STYLE_PATH:-/opt/baremaps/style.json}
echo "Style path: ${STYLE_PATH}"

/opt/baremaps/bin/baremaps map serve --database "${JDBC_URL}" --tileset "${TILESET_PATH}" --style "${STYLE_PATH}"
