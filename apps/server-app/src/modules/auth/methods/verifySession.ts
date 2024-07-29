import { SUCCESS } from '@ultron/common-library';
import { Request, Response } from 'express';
import { Container } from 'inversify';

export function verifySession(container: Container) {
  return async (req: Request, res: Response): Promise<void> => {
    res.status(200).send(SUCCESS<boolean>(true));
  };
}
