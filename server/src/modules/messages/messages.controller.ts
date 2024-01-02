import { NextFunction, Request, Response } from "express";
import { handSyncError } from "../../middlewares/handErrors.mid";
import prisma from "../../config/prisma";

const messagesController = {

  gets(req: Request, res: Response, next: NextFunction) {
    const statusCode = 200;

    handSyncError(async () => {

      // get all messages:
      const messages = await prisma.message.findMany();

      return res.status(statusCode).json({
        messages: messages,
      });
    }, next, prisma);
  },

  get(req: Request, res: Response, next: NextFunction) {
    const statusCode = 200;
    const {id} = req.params;

    handSyncError(async () => {

      // get all messages:
      const message = await prisma.message.findUnique({
        where: {
          id: (id as any),
        },
      });

      return res.status(statusCode).json({
        msg: message,
      });
    }, next, prisma);
  },

  create(req: Request, res: Response, next: NextFunction) {
    const statusCode = 201;
    const {text, senderId, recipientId} = req.body;
    const filename = req.file?.filename || '';
    /* console.log(req.body)
    console.log(req?.file?.filename);
    console.log(req?.file?.path); */
    console.log('message created!!', text, senderId, recipientId, filename);
    handSyncError(async () => {

      if (
        !text || !senderId || !recipientId
      ) {
        return res.status(200).json({
          msg: 'invalid input',
        })
      }

      // create a message
      const message = await prisma.message.create({
        data: {
          text: text,
          image: filename,
          sender: {connect: {id: senderId}},
          recipient: {connect: {id: recipientId}},
        },
      });

      return res.status(statusCode).json({
        msg: 'message created',
        message: message,
        success: true,
      });
    }, next, prisma);
  },

  update(req: Request, res: Response, next: NextFunction) {
    const statusCode = 201;
    const {id} = req.params;
    const {text} = req.body;

    handSyncError(async () => {

      // get all messages:
      const updatedMsg = await prisma.message.update({
        where: {id: id},
        data: {
          text: text,
        },
      });

      return res.status(statusCode).json({
        updated: updatedMsg,
      });
    }, next, prisma);
  },

  delete(req: Request, res: Response, next: NextFunction) {
    const statusCode = 200;
    const {id} = req.params;

    handSyncError(async () => {

      // get all messages:
      const deletedMsg = await prisma.message.delete({
        where: {id: id},
      });

      return res.status(statusCode).json({
        msg: `message: ${id} was deleted!`,
        deletedItem: deletedMsg,    
      });
    }, next, prisma);
  },
}

export default messagesController