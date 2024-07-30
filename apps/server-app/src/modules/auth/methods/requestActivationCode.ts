import { FAILURE, SUCCESS } from '@ultron/common-library';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../constants';
import { CoreManager } from '../contracts';

export function requestActivationCode(container: Container) {
  const coreManager: CoreManager = container.get<CoreManager>(AUTH_CONSTANTS.Symbols.Services.CoreManager);

  return async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        username
      }: {
        username: string;
      } = req.body;

      await coreManager.requestActivationCode(username);

      res.status(200).send(SUCCESS<void>(void 0));
    } catch (error: unknown) {
      res.status(500).send(FAILURE<void>(error as Error));
    }
  };
}
