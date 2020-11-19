FROM node:15.2.1-alpine3.12

LABEL author=Sleeyax
LABEL description="docker container image to run the StremioAddons discord bot"

ENV NODE_ENV=production
ENV DISCORD_TOKEN=
ENV DISCORD_PREFIX=!

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.production.json .

RUN npm i --production && npm cache clean --force

COPY src/ ./src/
RUN npm run dist
RUN rm -rf src/

ENTRYPOINT ["node", "dist/index.js"]
