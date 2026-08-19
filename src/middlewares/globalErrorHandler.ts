import { type Request, type Response, type NextFunction } from 'express';
import { Prisma } from '../../generated/prisma/client.js';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
//   if (res.headersSent) {
//     return next(err);
//   }
  let statusCode = 500;
  let errorMessage = 'Internal Server Error';
  let errorDetails = err;

//   PrismaClientValidationError 
if(err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = 'You have provided invalid data for the request.';  
}



  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  })
}

export default errorHandler;