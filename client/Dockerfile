FROM node:20-alpine as client

COPY ./ /home/node/app/client

WORKDIR /home/node/app/client


RUN yarn install

EXPOSE 80

CMD ["yarn", "dev"]
