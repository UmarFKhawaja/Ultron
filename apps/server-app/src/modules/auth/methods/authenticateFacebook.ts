import { NextFunction, Request, Response } from 'express';
import { Container } from 'inversify';

export function authenticateFacebook(container: Container) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    next();
  };
}
