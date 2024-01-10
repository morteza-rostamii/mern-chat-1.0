import nodemailer from 'nodemailer'
import { TEmailDetails } from '../types/types';

/* 

*/

// mailer object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'hotshotfellow@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  }
});

export function sendEmail(emailDetails: TEmailDetails, callback: (response: any) => void) {

  transporter.sendMail(emailDetails, (error, response) => {
    if (error) throw new Error(error?.message);

    callback(response);
  });
}