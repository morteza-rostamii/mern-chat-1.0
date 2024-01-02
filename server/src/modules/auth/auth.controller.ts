import { NextFunction, Request, Response } from "express";
import { handSyncError } from "../../middlewares/handErrors.mid";
import prisma from "../../config/prisma";
import { DEVELOPMENT, JWT_TOKEN_COOKIE_NAME, PRODUCTION, statusCodes } from "../../consts/const";
import { generateJwt } from "../../utils/jwt";
import jwt from 'jsonwebtoken'
import path from "path";

const jwt_secret = process.env.JWT_SECRET || '';
const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
const oneMonthInMilliseconds = 30 * oneDayInMilliseconds; // Approximate number of milliseconds in a month
// Calculate the expiration date one month from now
const expirationDate = new Date(Date.now() + oneMonthInMilliseconds);

const authController = {

  // create user and send magic-link
  register(req: Request, res: Response, next: NextFunction) {
    const {username, email} = req.body;

    handSyncError(async () => {

      if (!username || !email) return res.status(statusCodes.badRequest).json({
        msg: 'email and password missing!',
      })
      
      let user = null;

      // check if user already exists
      user = await prisma.user.findFirst({
        where: {
          email: email,
        }
      });

      if (!user) {
        // create new user
        user = await prisma.user.create({
          data: {
            username: username,
            email: email,
          }
        });
      }

      console.log('---**', user)
      // generate jwt token
      const token = generateJwt(user);

      // create magic-link
      const magicLink = `http://localhost:5173/login?token=${token}`;

      // send email
      console.log('magic-link: ', magicLink);

      return res.status(statusCodes.successResource).json({
        msg: 'magic-link was sent to your email!',
        success: true,
        user: user,
      });
    }, next, prisma);
  },

  // magic-link comes here with token
  login(req: Request, res: Response, next: NextFunction) {
    const statusCode = 200;
    // get token from url parameter
    //const token: any = req.query.token;
    const {token} = req.body;

    handSyncError(async () => {

      if (!token) return res.status(statusCodes.badRequest).json({
        msg: 'token does not exist!!',
      })

      // verify token
      jwt.verify(
        token, 
        jwt_secret,
        async (err: any, decoded_payload: any) => {
          if (err) {
            return res.status(statusCodes.forbidden).json({
              msg: 'bad token',
            });
          }

          // set cookie in HTTP-only cookie
          res.cookie(
            JWT_TOKEN_COOKIE_NAME,
            token, 
            {
              httpOnly: true,
              secure: process.env.NODE_ENV === PRODUCTION ? true : false,
             //maxAge: 3600000, // 1h
             //maxAge: 24 * 60 * 60 * 1000,
             //expires: new Date(Date.now() + 8 * 3600000), //8hours
             expires: expirationDate,
            },
          );

          // get user by id 
          const user = await prisma.user.findFirst({
            where: {
              id: decoded_payload.id,
            }
          });

          //return res.send('cookie set');

          return res.status(statusCodes.success).json({
            msg: 'logged in success',
            success: true,
            user: user,
          });
        }
      );
    }, next, prisma);
  },

  // logout
  logout(req: Request, res: Response, next: NextFunction) {

    handSyncError(async () => {

      res.clearCookie(JWT_TOKEN_COOKIE_NAME);

      return res.status(statusCodes.success).json({
        msg: 'user logged out',
        success: true,
      });
    }, next, prisma);
  },

  // check token expiry
  checkExpiry(req: Request, res: Response, next: NextFunction) {
    const statusCode = 200;
    //const {token} = req.body;
    const token: string = req.cookies.token;
    //console.log('token expiry route!!');

    handSyncError(async () => {

      if (!token) return res.status(statusCodes.success).json({
        msg: 'token does not exist!!',
        expiry: true,
      })

      // verify token
      jwt.verify(
        token, 
        jwt_secret,
        async (err: any, decoded_payload: any) => {
          if (err) {
            console.log('token expired!!');
            // clean token cookie
            res.clearCookie(JWT_TOKEN_COOKIE_NAME);

            return res.status(statusCodes.success).json({
              msg: 'bad token',
              expiry: true,
            });
          }

          // valid token
          return res.status(statusCodes.success).json({
            msg: 'token valid',
            expiry: false,
          });
        }
      );
    }, next, prisma);
  },

  // search users
  searchUsers(req: Request, res: Response, next: NextFunction) {
    const statusCode = 200;
    const {username, authUserId} = req.body;
    console.log('search,,,', username, authUserId)
    handSyncError(async () => {

      if (!username) return res.status(statusCodes.badRequest).json({
        msg: 'username not exist!!',
      })

      // find all users that have this text in their username:
      /* const users = await prisma.user.findMany({
        where: {
          username: {
            contains: username,
          },
          id: {
            not: authUserId,
          },
          
          // if: authUser is a request sender
          friendsOf: {
            none: {
              senderId: authUserId,
            }
          }, 
          friends: {
            none: {
              recipientId: authUserId,
            }
          }
        },
        include: {
          friends: true,
          friendsOf: true,
        }
      }); */

      const users = await prisma.user.findMany({
        where: {
          username: {
            contains: username,
          },
          id: {
            not: authUserId,
          },
          
          // if: authUser is a request sender
          NOT: {
            chats: {
              some: {
                users: {some: {id: authUserId}}
              }
            }
          }
        },
        /* include: {
          friends: true,
          friendsOf: true,
        } */
      });

      //console.log(users);

      return res.status(statusCodes.successResource).json({
        msg: 'list of searched users',
        users: users,
      })
    }, next, prisma);
  },

  // add friends
  addFriend(req: Request, res: Response, next: NextFunction) {
    const statusCode = 200;
    const {senderId, recipientId} = req.body;

    console.log('add-friend', req.body)
    handSyncError(async () => {

      if (!senderId || !recipientId) return res.status(statusCodes.badRequest).json({
        msg: 'invalid input',
      })

      // add friend
      const chat = await prisma.chat.create({
        data: {
          users: {
            connect: [
              {id: senderId},
              {id: recipientId},
            ],
          },
        },
      });

      return res.status(statusCodes.success).json({
        msg: 'friend added!',
        success: true,
        chat: chat,
      })
      
    }, next, prisma);
  },

  // get friends
  getFriends(req: Request, res: Response, next: NextFunction) {
    const {authUserId} = req.body;

    handSyncError(async () => {

      if (!authUserId) return res.status(statusCodes.badRequest).json({
        msg: 'invalid input',
      })

      // add friend
      /* const friends = await prisma.user.findMany({
        where: {
          OR: [
            {
              friends: {
                some: {
                  recipientId: authUserId,
                }
              },
            },
            {
              friendsOf: {
                some: {
                  senderId: authUserId,
                }
              }
            }
          ]
        },

        include: {
          messagesSent: {
            where: {
              recipientId: authUserId,
            }
          },
          messagesReceived: {
            where: {
              senderId: authUserId,
            }
          }
        }
      }); */

      // get auth user chats
      const chats = await prisma.chat.findMany({
        where: {
          users: {
           some: {
            id: authUserId,
           } 
          }
        }, 
        include: {
          users: true,
          messages: {
            orderBy: {createdAt: 'asc'},
          },
        }
      });

      //console.log(req.get('host'), req.originalUrl)
      const HOSTNAME = 
        process.env.NODE_ENV === DEVELOPMENT 
        ? `${req.protocol}://${req.get('host')}/` 
        : `${req.protocol}://${req.get('host')}/` 

      // edit msg url
      chats.forEach((chat: any)  => {
        chat.messages.forEach((msg: any) => {
          if (msg.image) {
            msg.image = HOSTNAME + 'images/' + msg.image;
          } 
        })
      })

      return res.status(statusCodes.success).json({
        msg: 'fetch friends',
        success: true,
        chats: chats,
      })
      
    }, next, prisma);
  },
}

export default authController