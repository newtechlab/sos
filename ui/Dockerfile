# Builder image
FROM node:16-bullseye as builder
RUN mkdir -p /code
COPY . /code
WORKDIR /code/

ENV NODE_ENV production
RUN yarn install
RUN yarn build

# App image
FROM nginx:1.21.5-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /code/build/ /usr/share/nginx/html
COPY --from=builder /code/config/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80