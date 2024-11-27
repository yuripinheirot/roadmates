FROM node:20-alpine as api

COPY ./ /home/node/app/api

WORKDIR /home/node/app/api

RUN yarn install
RUN npx prisma generate

EXPOSE 8080

CMD ["yarn", "dev"]
