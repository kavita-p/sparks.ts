FROM node:18-alpine

USER root
WORKDIR /usr/src/sparks.ts

COPY package.json ./
RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node
RUN pnpm install --prod

COPY . .

RUN pnpm build

CMD ["pnpm", "start"]




