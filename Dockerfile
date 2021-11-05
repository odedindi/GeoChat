FROM node:latest

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

RUN npm install -g yarn --force

WORKDIR /usr/src/app

RUN mkdir -p /server

COPY ./server /server

WORKDIR /server

RUN yarn install && yarn build 

CMD [ "yarn", "start" ]