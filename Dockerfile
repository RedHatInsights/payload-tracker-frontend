FROM registry.redhat.io/ubi8/ubi-minimal:latest

WORKDIR /usr/src/app

ARG SERVICE_HOST
ENV API_HOST=${SERVICE_HOST:+$SERVICE_HOST}
ENV API_HOST=${SERVICE_HOST:-localhost}

USER 0

RUN microdnf install nodejs nginx

COPY package.json package-lock.json ./
RUN npm ci && npm i --only=dev && npm install yarn


COPY src ./src
COPY .babelrc ./.babelrc
COPY *.js ./

RUN npm run build && \
    rm -rfv /usr/share/nginx/html && \
    cp -rfv /usr/src/app/dist /usr/share/nginx/html && \
    chown nginx:nginx -R /usr/share/nginx/html && \
    mkdir -p /var/cache/nginx && \
    chown 777 -R /var/log/nginx && \
    chmod 777 -R /var/cache/nginx

COPY nginx.conf /etc/nginx/nginx.conf

RUN sed -i s/API_HOST/$API_HOST/g /etc/nginx/nginx.conf

EXPOSE 8080
STOPSIGNAL SIGTERM
USER 100

CMD ["nginx", "-g", "daemon off;"]

