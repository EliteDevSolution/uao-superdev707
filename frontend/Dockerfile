FROM node:20

WORKDIR /app

COPY package*.json .

RUN NODE_ENV=development npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
