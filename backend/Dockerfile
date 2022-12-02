FROM node:slim

WORKDIR /usr/src/app
COPY . .
RUN npm i
WORKDIR /usr/src/app/

EXPOSE 3000
CMD [ "node", "app.js" ]