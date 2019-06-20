FROM node:8
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build
RUN yarn global add serve
EXPOSE 8080
CMD ["serve", "-s", "build", "-l", "8080"]