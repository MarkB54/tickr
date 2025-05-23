// Assume that we have already called current-user middleware
// So if req.currentUser is not defined, respond with an error
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  // If they get past this check, we allow user to continue to next
  // middleware or route handling function
  next();
};
