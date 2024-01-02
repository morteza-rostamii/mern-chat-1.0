import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import cookieParser from 'cookie-parser'
import { NextFunction, Request, Response } from 'express';
import { JWT_TOKEN_COOKIE_NAME } from '../consts/const';

const jwt_secret = process.env.JWT_SECRET || '';

export function generateJwt(user: any) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(
    payload,
    jwt_secret,
    {
      //expiresIn: '1h',
      expiresIn: '365d',
    },
  );
}

// middleware to authenticate jwt token from cookie
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token: string = req.cookies.token;
  const statusCodeUnauthorized = 401;
  const statusCodeForbidden = 403;

  // check if token exist
  if (!token) return res.status(statusCodeUnauthorized).json({
    msg: 'unauthorized resource!!',
  })

  jwt.verify(
    token, 
    jwt_secret,
    (err: any, decoded_payload: any) => {
      if (err) {
        // if: bad token =: remove token from cookie
        res.clearCookie(JWT_TOKEN_COOKIE_NAME);
        return res.status(statusCodeForbidden).json({
          msg: 'bad token',
        });
      }

      // set payload on request_object and go to the next middleware
      (req as any).user = decoded_payload;
      next();
    }
  );
}