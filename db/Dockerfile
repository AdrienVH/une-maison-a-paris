FROM kartoza/postgis

ENV POSTGRES_USER=batiments
ENV POSTGRES_PASSWORD=batiments
ENV POSTGRES_DB=batiments

COPY ./sql/postgis_00_extensions.sql /docker-entrypoint-initdb.d/
COPY ./sql/postgis_01_batiments.sql /docker-entrypoint-initdb.d/

EXPOSE 5432