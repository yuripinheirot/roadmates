FROM node:20-alpine as client

COPY ./ /home/node/app/client

WORKDIR /home/node/app/client

EXPOSE 80

RUN yarn install

CMD ["yarn", "dev"]
