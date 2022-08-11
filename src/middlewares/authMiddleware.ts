import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader  ? authorizationHeader .split(' ')[1] : '';
    const decoded = jwt.verify(token , process.env.TOKEN_SECRET as string);
    res.locals.userData = decoded;
    next()
  } catch (err : any) {
    err.code = 401;
    const { message } = err as { message: string };
    res.status(err.code).json({message})
  }
};