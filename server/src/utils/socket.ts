import { writeFile } from 'fs';
import {v4 as uuidv4} from 'uuid'
import fs from 'fs'
import {Server} from 'socket.io'
import { CLIENT_SENT_MSG, DEVELOPMENT, EVENT_ONLINE_CLIENTS, SEND_MSG_TO_RECIPIENT } from '../consts/const';

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
  socket.emit(EVENT_ONLINE_CLIENTS, {
    onlines: Array.from(setClientsIds),
  });
}

const onlineClients: any = [];

export function setupSocket(server: any, prisma: any): void {

  // socket io instance
  const ws = new Server(server, {
    cors: {
      origin: '*',
    }
  });

  // on connection
  ws.on('connection', async (socket:any) => {
    console.log('a client connected ' + socket.id, socket.handshake.auth.userId);
    //const auth = socket.handshake.auth.userId;
    
    onlineClients.push(socket);

    // send online users to all users
    getOnlineClients(onlineClients, ws);

    // on CLIENT_SENT_MSG
    socket.on(CLIENT_SENT_MSG, async (payload: any, cb: any) => {

      const formData = JSON.parse(payload);
      const {
        text,
        senderId,
        recipientId,
      } = formData;

      // if: formData.image =: upload the image
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

      // loop through all sockets and join the same room
      //const room = senderId + recipientId;
      
      // recipient's sockets
      const recipientSockets = onlineClients.filter((sock:any) => {
        //console.log(sock.handshake.auth.userId, recipientId)
        return sock.handshake.auth.userId === recipientId;
      })

      const roomName: string = senderId + recipientId;

      // send message to recipient
      recipientSockets.forEach((sock: any) => {
        console.log(`message to: ${sock.handshake.auth.userId}`)
        //sock.emit(SEND_MSG_TO_RECIPIENT, {msg: message});
        sock.join(roomName);
      });

      socket.join(roomName);

      console.log('******^^::', socket, roomName);
      socket.to(roomName).emit(SEND_MSG_TO_RECIPIENT, {
        msg: message,
      });

      /* recipientSockets.forEach((sock: any) => {
        console.log(`message to: ${sock.handshake.auth.userId}--`)
        sock.to(roomName).emit(SEND_MSG_TO_RECIPIENT, {
          msg: message,
        });
      }); */

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

      // send online clients on disconnect
      getOnlineClients(onlineClients, ws);
    });
  });
}