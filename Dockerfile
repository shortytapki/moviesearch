FROM node:20-alpine

WORKDIR /moviesearch

COPY webpack.config.ts .

COPY ./config/build .

COPY package.json .

COPY tsconfig.json .

RUN npm install

COPY . .

EXPOSE 7070

CMD [ "npm", "run", "start" ]