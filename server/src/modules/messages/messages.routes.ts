import express from "express";
import messagesController from "./messages.controller";
import { authenticateToken } from "../../utils/jwt";
import upload from "../../middlewares/oneImgUpload.mid";

const router = express.Router();

// GET: /messages
router
  .route('/')
  .get(messagesController.gets);

// GET: /messages/:id
router
  .route('/:id')
  .get(authenticateToken, messagesController.get);

// POST: /messages
router
  .route('/')
  .post(authenticateToken, upload.single('image'), messagesController.create);

// UPDATE: /messages/:id
router
  .route('/:id')
  .put(messagesController.update);

// DELETE: /messages/:id
router
  .route('/:id')
  .delete(messagesController.delete);

export default router