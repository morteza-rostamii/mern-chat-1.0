# Dockerfile for React client

# Build react client
FROM node:18.18.2

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 3002

CMD ["npm","run", "dev"]