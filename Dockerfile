FROM node:latest

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && apt update && apt install yarn -y

WORKDIR /usr/src/app

RUN mkdir -p /server

COPY ./server /server

WORKDIR /server

RUN ls

RUN yarn install && yarn build && yarn start

COPY . .

EXPOSE 4000

CMD [ "yarn", "start:server" ]