import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();


export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader : string | undefined = req.headers.authorization;
    const token : string = authorizationHeader ? authorizationHeader.split(' ')[1]: '';
    const decoded = jwt.verify(token , `${process.env.TOKEN_SECRET}`);
    res.locals.userData = decoded;
    next();
  } catch (err : any) {
    err.code = 401;
    const { message } = err as { message: string };
    res.status(err.code).json({message})
  }
};