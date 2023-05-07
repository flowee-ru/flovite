FROM node:18-buster AS builder

WORKDIR /usr/src/app
COPY . .

RUN yarn install

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .

EXPOSE 8080
CMD ["yarn", "build:start"]