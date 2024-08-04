FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 8000

CMD ["npm", "start"]