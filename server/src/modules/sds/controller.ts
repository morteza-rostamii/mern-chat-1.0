import { NextFunction, Request, Response } from "express";
import { handSyncError } from "../../middlewares/handErrors.mid";
import { prisma } from "../..";

const messagesController = {

  gets(req: Request, res: Response, next: NextFunction) {
    const statusCode = 200;

    handSyncError(() => {

      // get all messages:


      return res.status(statusCode).json({
        msg: 'get all messages',
      });
    }, next, prisma);
  },

  get(req: Request, res: Response, next: NextFunction) {
    const statusCode = 200;

    handSyncError(() => {

      // get all messages:


      return res.status(statusCode).json({
        msg: 'get all messages',
      });
    }, next, prisma);
  },

  create(req: Request, res: Response, next: NextFunction) {
    const statusCode = 201;

    handSyncError(() => {

      // get all messages:


      return res.status(statusCode).json({
        msg: 'get all messages',
      });
    }, next, prisma);
  },

  update(req: Request, res: Response, next: NextFunction) {
    const statusCode = 201;

    handSyncError(() => {

      // get all messages:


      return res.status(statusCode).json({
        msg: 'get all messages',
      });
    }, next, prisma);
  },

  delete(req: Request, res: Response, next: NextFunction) {
    const statusCode = 204;

    handSyncError(() => {

      // get all messages:


      return res.status(statusCode).json({
        msg: 'get all messages',
      });
    }, next, prisma);
  },
}

export default messagesController