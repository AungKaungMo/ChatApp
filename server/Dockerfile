FROM node:20-alpine

RUN apk add --no-cache \
    gcc \
    g++ \
    make \
    libc-dev \
    python3 \
    bash \
    libc6-compat 

RUN npm install -g ts-node typescript nodemon

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "run", "dev"]