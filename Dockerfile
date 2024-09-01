FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# RUN npx prisma migrate deploy

EXPOSE 3001

CMD [ "npm", "run", "start:dev" ]