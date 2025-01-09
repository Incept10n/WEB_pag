FROM postgres:13

ENV POSTGRES_DB=pagdb
ENV POSTGRES_USER=paguser
ENV POSTGRES_PASSWORD=2143658790ADM+

COPY dump.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

CMD ["postgres"]
