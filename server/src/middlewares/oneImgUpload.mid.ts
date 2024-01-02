import { NextFunction, Request, Response } from "express";
import multer from 'multer'
import path from "path";
import {v4 as uuidv4} from 'uuid'

//console.log('file--')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    //cb(null, path.resolve('./public/images'));
    cb(null, path.join(process.cwd(), 'public', 'images'));
  },

  filename: function(req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
})

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedFileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png'
  ];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage,
  limits : {fileSize : 3000000}, //3mb
  fileFilter,
});

export default upload