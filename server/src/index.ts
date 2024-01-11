import express, { NextFunction, Request, Response } from 'express';
import errorHandler from './middlewares/handErrors.mid';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { PrismaClient } from "@prisma/client";

// routes
import messagesRouter from './modules/messages/messages.routes'
import authRouter from './modules/auth/auth.routes'
import path from 'path';
import { CLIENT_SENT_MSG, CLIENT_URL, DEVELOPMENT, EVENT_ONLINE_CLIENTS, SERVER_SENT_MSG } from './consts/const';
import { setupSocket } from './utils/socket';

export const prisma = new PrismaClient();

function main(): void {

  prisma.$connect()
    .then(() => {
      console.log('connected to db!!');

      runNodeServer(prisma);
    })
    .catch((error: any) => {
      console.error('error connecting to db! ', error?.message || error);
    });
}

function runNodeServer(prisma: any): void {

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

  server.on('listening', () => {
    console.log('node is here!!');

    setupSocket(server, prisma);
  });
}

main();