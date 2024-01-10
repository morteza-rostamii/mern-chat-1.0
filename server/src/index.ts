import express, { NextFunction, Request, Response } from 'express';
import errorHandler from './middlewares/handErrors.mid';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
//import WebSocket from 'ws';
import {Server} from 'socket.io'
import { writeFile } from 'fs';
import {v4 as uuidv4} from 'uuid'
import fs from 'fs'

// routes
import messagesRouter from './modules/messages/messages.routes'
import authRouter from './modules/auth/auth.routes'
import path from 'path';
import { CLIENT_SENT_MSG, CLIENT_URL, DEVELOPMENT, EVENT_ONLINE_CLIENTS, SERVER_SENT_MSG } from './consts/const';
import prisma from './config/prisma';

dotenv.config();
const app = express();
const PORT = process.env.NODE_PORT || 3001;

// public s tatic files
app.use(express.static(path.join(process.cwd(), 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  //origin: '*',
  origin: CLIENT_URL, 
  //methods: 
  credentials: true,
}));

// routes
app.use('/messages', messagesRouter);
app.use('/auth', authRouter);

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  //res.send('Hello, Express with TypeScript!');

  const error: any = new Error('Custom Error: ');
  error.statusCode = 404;

  // Pass the error to the next middleware
  next(error);
});

// Using the error handling middleware
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// socket io
//const SOCKET_PORT = process.env.SOCKET_PORT || 8080;

function writeFileToImagesDir(buffer: any, file: any) {
  console.log(file.type);
  const filename = `${uuidv4()}${file.name}`;
  const filepath = `./public/images/${filename}`;

  writeFile(filepath, buffer, (err: any) => {
    if (err) {
      console.error('Error', err);
    } else {
      console.log('File Saved!!', filename);
    }
  })
}

function getOnlineClients(clients: any[], socket:any) {
  const clientsIds = clients.map((sock:any) => {
    return sock.handshake.auth.userId;
  }); 

  // remove repeated ids
  const setClientsIds = new Set(clientsIds);
  console.log('--', setClientsIds);
  socket.emit(EVENT_ONLINE_CLIENTS, {
    onlines: Array.from(setClientsIds),
  });
}

// socket io instance
export const ws = new Server(server, {
  cors: {
    origin: '*',
  }
});

const onlineClients: any = [];

// on connection
ws.on('connection', async (socket:any) => {
  console.log('a client connected ' + socket.id);
  console.log(socket.handshake.auth.userId);
  const auth = socket.handshake.auth.userId;
  
  onlineClients.push(socket);
  //console.log('conc: ', onlineClients.map((el:any) => ({sockId: el.id, userId: el.handshake.auth.userId})));

  // send online users to all users
  getOnlineClients(onlineClients, ws);

  //ws.emit('love', {data: 'lover'});

  //console.log('clients:: ', onlineClients);

  // on CLIENT_SENT_MSG
  socket.on(CLIENT_SENT_MSG, async (payload: any, cb: any) => {

    const formData = JSON.parse(payload);
    const {
      text,
      senderId,
      recipientId,
    } = formData;

    //console.log('received formData', JSON.parse(formData.image));
    
    let filename = '';
    if (formData?.image) {
      const image = JSON.parse(formData.image);
      const imgData = image.data;
      const splitted = imgData.split(';base64,');
      const format = splitted[0].split('/')[1];
  
      filename = `${uuidv4()}.${format}`;
  
      // upload
      fs.writeFileSync(`./public/images/${filename}`, splitted[1], { encoding: 'base64' });
    }
    
    // store image name in db
    // create message and add to chat 

    const chat = await prisma.chat.findFirst({
      where: {
        AND: [
          {users: {some: {id: senderId}}},
          {users: {some: {id: recipientId}}},
        ],
      }, 
      include: {
        users: true,
        messages: true,
      }
    });

    if (!chat) return;

    // create message and save message in chat
    const message: any = await prisma.message.create({
      data: {
        text: text,
        senderId: senderId,
        recipientId: recipientId,
        image: filename || '',
        // connect relation
        chatId: chat?.id,
      }, 
      include: {Chat: true},
    });

    const request = socket.request;
    const isSecureConnection = socket.conn.transport.constructor.name === 'EngineHttps';
    const protocol = isSecureConnection ? 'https' : 'http';
    const HOSTNAME = 
        process.env.NODE_ENV === DEVELOPMENT 
        ? `${protocol}://${request.headers.host}/` 
        : `${protocol}://${request.headers.host}/`

    // edit msg url
    if (message.image) {
      message.image = HOSTNAME + 'images/' + message.image;
    } 

    //console.log(message)

    // loop through all sockets and join the same room
    //const room = senderId + recipientId;
    
    // recipient's sockets
    const recipientSockets = onlineClients.filter((sock:any) => {
      console.log(sock.handshake.auth.userId, recipientId)
      return sock.handshake.auth.userId === recipientId;
    })

    //console.log('---recipient: ', recipientSockets)

    // send message to recipient
    recipientSockets.forEach((sock: any) => {
      console.log(`message to: ${sock.handshake.auth.userId}`)
      sock.emit('msg', {msg: message})
    });

    // callback
    cb(message);
  });

  // on disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);

    // remove disconnected clients from onlineClients
    if (onlineClients.some((sock:any) => sock.id === socket.id)) {
      const index = onlineClients.findIndex((obj:any) => obj.id === socket.id);
      onlineClients.splice(index, 1);
    }

    console.log('disc: ', onlineClients.map((el:any) => ({sockId: el.id, userId: socket.handshake.auth.userId})));

    // send online clients on disconnect
    getOnlineClients(onlineClients, ws);

    /* if (onlineClients[userId]) {
      onlineClients[userId] = onlineClients[userId].filter((s: any) => s !== socket);
    } */
    //socket.disconnect();
  });
});