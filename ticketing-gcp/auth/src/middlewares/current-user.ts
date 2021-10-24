import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  //logic for augmenting Type
  namespace Express {
    //inside the Express project
    interface Request {
      //find the interface Request (default type for req)
      currentUser?: UserPayload; //add additional property to it
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    //TS syntax for: if session does not exist or jwt token does not exist, then next middleware in the chain
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload; //need to augment Type Definition for req by adding currentUser, since it does not exist
  } catch (err) {
    next(); //logically it's redundant since we want to continue to next function regardless of the error, but keeping it anyways
    //the next function will determine what to do with valid/invalid user or token, hence next() is after catch statement
  }
  next();
};
