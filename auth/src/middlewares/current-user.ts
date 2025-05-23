import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

// Modifies the existing type definition of Request
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If req.session does not exist (evaluate to true) or
  // req.session.jwt does not exist
  if (!req.session?.jwt) {
    return next();
  }

  // Now we want to decode the jwt token
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  // if payload has or has not been tamperd with, we want to go to the next middleware
  next();
};
