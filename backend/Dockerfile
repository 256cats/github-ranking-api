FROM node:20-bookworm-slim

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV} NODE_OPTIONS="--enable-source-maps"

ENV SRV_PORT=5000
ENV PROM_PORT=9999

RUN apt-get update -qq && apt-get install -qq -y --no-install-recommends wait-for-it build-essential python3

USER 1000
RUN mkdir /home/node/app && chown node:node -R /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig*.json ./
COPY --chown=node:node .eslintrc.js ./
COPY --chown=node:node .prettierrc ./.prettierrc
COPY --chown=node:node prisma ./prisma/

RUN npm ci --loglevel warn --build-from-source

COPY --chown=node:node . .

RUN npm run build

EXPOSE $SRV_PORT

CMD ["npm", "start"]
