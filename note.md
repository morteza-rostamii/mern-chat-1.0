<!-- 
git@github.com:morteza-rostamii/mern-chat-1.0.git

# setup typescript, prisma and postgress [ ]

  # check if postgres is installed:
    dpkg -l | grep postgres
    systemctl status postgresql

  # 

# enter postgres terminal:
==
sudo -u postgres psql

# user can create, update, delete and read messages [ ]

# install postgres
sudo apt-get update
sudo apt-get install postgresql

# get a list of users:
\du

# create a new user with password:

CREATE USER username WITH PASSWORD 'your_password';

# grant privileges:

GRANT CREATEDB TO newuser;
ALTER USER morteza CREATEDB;

# exit
\q

==================================

# setup express with typescript:
==

npm install typescript @types/node @types/express ts-node-dev express

# create tsconfig.ts
npx tsc --init

======
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist" // Output directory for compiled JavaScript
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}

=====

# setup prisma with postgresql:

npm install prisma --save-dev
npx prisma init --datasource-provider postgresql

# list of postgres dbs:
\l;

==============

# switch database
\c chat;

# show tables:
\dt;

# drop a database
DROP DATABASE chat;

==============

# create a new db:
CREATE DATABASE chat;

# grant all priviledges
CREATE USER user_name WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON chat to rostami;
GRANT ALL PRIVILEGES ON SCHEMA public TO rostami;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO rostami;

# be sure new user is super-user for prisma migrate to postgres to work:
==
ALTER ROLE username WITH SUPERUSER;

=========

# see postgres port:
show port;

===============================

# migrate
npx prisma migrate dev --name init

npm install @prisma/client

 =====================
npx prisma studio


 -->
















<!-- 

# database design:
==

User:
  chat app users

Message:
  messages between friends
  # messages have image
  # messages have emojis

FriendRequest:
  requests send for friendShip (add, pending, excepted or friends)

Friend:
  user-a is friend with user-b

# also: i need to keep track of 10 recent messages sent by each friend
# also: i should be able the differentiate between: seen and unseen messages

 -->

<!-- 

# posgress & prisma relationships:
==

# one to one 

# one to many

model User {

 friends User[] 
}

# many to many

 -->