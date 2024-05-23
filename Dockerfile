FROM registry.access.redhat.com/ubi8/ubi-minimal:latest

WORKDIR /usr/src/app

ARG SERVICE_HOST
ENV API_HOST=${SERVICE_HOST:+$SERVICE_HOST}
ENV API_HOST=${SERVICE_HOST:-localhost}
ENV NODEJS_VERSION=20

USER 0

RUN microdnf update && microdnf module enable nginx:1.22 && microdnf install nginx

RUN INSTALL_PKGS="nodejs nodejs-nodemon nodejs-full-i18n npm findutils tar which" && \
    microdnf -y module disable nodejs && \
    microdnf -y module enable nodejs:$NODEJS_VERSION && \
    microdnf --nodocs --setopt=install_weak_deps=0 install $INSTALL_PKGS && \
    node -v | grep -qe "^v$NODEJS_VERSION\." && echo "Found VERSION $NODEJS_VERSION" && \
    microdnf clean all && \
    rm -rf /mnt/rootfs/var/cache/* /mnt/rootfs/var/log/dnf* /mnt/rootfs/var/log/yum.*

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
    chmod 777 -R /var/log/nginx && \
    chmod 777 -R /var/cache/nginx

# This file is not used in openshift, but is in the image
# in the event it is used for local development
COPY nginx.conf /etc/nginx/nginx.conf

RUN sed -i s/API_HOST/$API_HOST/g /etc/nginx/nginx.conf

EXPOSE 8080
STOPSIGNAL SIGTERM
USER 100

CMD ["nginx", "-g", "daemon off;"]

