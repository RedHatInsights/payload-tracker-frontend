FROM registry.access.redhat.com/ubi9/ubi-minimal:latest

WORKDIR /usr/src/app

ARG SERVICE_HOST
ENV API_HOST=${SERVICE_HOST:+$SERVICE_HOST}
ENV API_HOST=${SERVICE_HOST:-localhost}
ENV NODEJS_VERSION=22

USER 0

# Install nginx with CVE-2024-7347 fix
# CVE-2024-7347: Out-of-bounds read/write in ngx_http_mp4_module
# Fixed in nginx >= 1.26.1 and >= 1.27.0
# Mitigation: Use latest patched version from nginx:1.26 stream + verify no mp4 module usage
RUN microdnf update -y && \
    microdnf -y module enable nginx:1.26 && \
    microdnf install nginx -y && \
    microdnf upgrade -y nginx && \
    echo "Installed nginx version:" && \
    nginx -v 2>&1 | tee /tmp/nginx-version.txt && \
    NGINX_VERSION=$(nginx -v 2>&1 | grep -oP 'nginx/\K[0-9.]+') && \
    echo "Detected nginx version: $NGINX_VERSION" && \
    MAJOR=$(echo $NGINX_VERSION | cut -d. -f1) && \
    MINOR=$(echo $NGINX_VERSION | cut -d. -f2) && \
    PATCH=$(echo $NGINX_VERSION | cut -d. -f3) && \
    if [ "$MAJOR" -eq 1 ] && [ "$MINOR" -eq 26 ] && [ "$PATCH" -lt 1 ]; then \
        echo "ERROR: nginx version $NGINX_VERSION is vulnerable to CVE-2024-7347 (requires >= 1.26.1)"; \
        exit 1; \
    elif [ "$MAJOR" -eq 1 ] && [ "$MINOR" -lt 26 ]; then \
        echo "ERROR: nginx version $NGINX_VERSION is vulnerable to CVE-2024-7347 (requires >= 1.26.1 or >= 1.27.0)"; \
        exit 1; \
    fi && \
    echo "✓ nginx version $NGINX_VERSION is patched for CVE-2024-7347" && \
    microdnf clean all

RUN INSTALL_PKGS="nodejs nodejs-nodemon nodejs-full-i18n npm findutils tar which" && \
    microdnf -y module disable nodejs && \
    microdnf -y module enable nodejs:$NODEJS_VERSION && \
    microdnf -y --nodocs --setopt=install_weak_deps=0 install $INSTALL_PKGS && \
    node -v | grep -qe "^v$NODEJS_VERSION\." && echo "Found VERSION $NODEJS_VERSION" && \
    microdnf clean all && \
    rm -rf /mnt/rootfs/var/cache/* /mnt/rootfs/var/log/dnf* /mnt/rootfs/var/log/yum.*

RUN npm install -g npm@latest

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
    chmod 777 -R /var/cache/nginx && \
    rm -rf /usr/src/app/node_modules

# Runtime is nginx + static files only; drop Node so SBOM scanners do not flag npm's bundled deps.
# Remove Node packages, npm files, and all build artifacts
RUN rpm -qa | grep -E '^(nodejs|npm)' | xargs -r microdnf remove -y && \
    microdnf remove -y findutils tar which 2>/dev/null || true && \
    microdnf clean all && \
    rm -rf /root/.npm && \
    rm -rf /usr/src/app/package*.json && \
    rm -rf /usr/src/app/.npm* && \
    rm -rf /usr/src/app/node_modules && \
    rm -rf /usr/src/app/src && \
    rm -rf /usr/src/app/.babelrc && \
    rm -rf /usr/src/app/*.js

# This file is not used in openshift, but is in the image
# in the event it is used for local development
COPY nginx.conf /etc/nginx/nginx.conf

RUN sed -i s/API_HOST/$API_HOST/g /etc/nginx/nginx.conf && \
    echo "Verifying nginx configuration does not use mp4 module (CVE-2024-7347)..." && \
    if grep -rE '^\s*(mp4|mp4_buffer_size|mp4_max_buffer_size)\s' /etc/nginx/*.conf /etc/nginx/conf.d/*.conf 2>/dev/null; then \
        echo "ERROR: mp4 directive found in nginx config - this enables vulnerable ngx_http_mp4_module (CVE-2024-7347)" && \
        exit 1; \
    fi && \
    echo "✓ nginx configuration is safe from CVE-2024-7347"

EXPOSE 8080
STOPSIGNAL SIGTERM
USER 100

CMD ["nginx", "-g", "daemon off;"]

