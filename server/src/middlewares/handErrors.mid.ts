import { NextFunction, Request, Response } from "express";

export function handSyncError(runCode: any, next: NextFunction, prisma: any = null) {
  try {
    runCode();
  } catch(error: any) {
    return next(error);
  } finally {
    (async () => await prisma ? prisma?.$disconnect() : '')();
  }
}

// Custom Error Handling Middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Default status code and error message
  const statusCode = err?.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error for debugging purposes
  console.error(err);

  // Send error response to the client
  res.status(statusCode).json({
    error: {
      message: message,
    },
  });
};

export default errorHandler

// for async method errors
// passing an error into next(error) goes to errorHandling middleware

/* 
app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id)
  res.send(user)
})

if: getUserById() rejects promise or throws error
  # next will be called with either the thrown error or the rejected value.

# If you pass anything to the next() function (except the string 'route'), Express regards the current request as being an error and will skip any remaining non-error handling routing and middleware functions.



*/