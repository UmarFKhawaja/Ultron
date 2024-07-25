import { Request, Response } from 'express';
import { Container } from 'inversify';

export function requestActivationCode(container: Container) {
  return async (req: Request, res: Response): Promise<void> => {
    res.end();
  };
}
