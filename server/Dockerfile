#  Dockerfile for Node Express Backend

FROM node:18.18.2

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# install prisma Globally
RUN npm install -g prisma

# prisma postgres migrate
#RUN npx prisma migrate dev --name init

RUN npm install @prisma/client

ENV DATABASE_URL="postgresql://morteza:love@postgres:5432/chat?schema=public"

# Exports
EXPOSE 3001

# this runs on docker-compose up (run container)
#CMD ["npm","start"]