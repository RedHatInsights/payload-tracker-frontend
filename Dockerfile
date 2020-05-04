FROM exiasr/alpine-yarn-nginx
WORKDIR /usr/src/app
ARG SERVICE_HOST
ENV API_HOST=${SERVICE_HOST:+$SERVICE_HOST}
ENV API_HOST=${SERVICE_HOST:-localhost}
COPY package.json yarn.lock ./
RUN yarn
COPY src ./src
COPY public ./public
RUN yarn build
RUN ["rm", "-rfv", "/usr/share/nginx/html"]
RUN ["cp", "-rfv", "/usr/src/app/build", "/usr/share/nginx/html"]
RUN chown nginx:nginx -R /usr/share/nginx/html
RUN chmod 777 -R /var/log/nginx && chmod 777 -R /var/cache/nginx
COPY nginx.conf /etc/nginx/nginx.conf
RUN sed -i s/API_HOST/$API_HOST/g /etc/nginx/nginx.conf
EXPOSE 8080
STOPSIGNAL SIGTERM
USER 100
CMD ["nginx", "-g", "daemon off;"]