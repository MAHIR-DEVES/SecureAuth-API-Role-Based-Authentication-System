import { NextFunction, Request, Response } from 'express';

const verify = (req: Request, res: Response, next: NextFunction) => {
  const id = true;
  if (!id) {
    console.log('i card nai');
    res.send(false);
    return;
  }
  console.log('id card asa ');
  next();
};

export default verify;
