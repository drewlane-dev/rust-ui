# docker build -t "us.gcr.io/discogs-notifier-300502/rust-daddy:latest" . --file ./apps/discogs-notifier-web/Dockerfile
# docker push "us.gcr.io/discogs-notifier-300502/rust-daddy:latest"

FROM node:12-slim as builder

WORKDIR /usr/src/app

COPY ./package.json ./package.json

RUN npm i

COPY . .
RUN npx ng build --prod

WORKDIR /usr/src/app/dist
RUN ls



FROM node:12-slim

WORKDIR /usr/src/app
RUN mkdir /usr/src/app/frontend
COPY --from=builder /usr/src/app/dist/apps/discogs-notifier-web /usr/src/app/frontend

COPY ./server /usr/src/app
RUN npm install

EXPOSE $PORT

CMD [ "node", "server.js" ]
