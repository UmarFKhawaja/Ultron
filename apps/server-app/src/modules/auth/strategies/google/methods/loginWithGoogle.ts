import { Request, Response } from 'express';
import { Container } from 'inversify';

export function loginWithGoogle(container: Container) {
  return async (req: Request, res: Response): Promise<void> => {
    res.end();
  };
}
