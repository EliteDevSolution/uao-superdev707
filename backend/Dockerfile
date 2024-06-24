FROM node:20

WORKDIR /src

COPY package*.json .

RUN NODE_ENV=development npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
