import { FAILURE, Information, SUCCESS } from '@ultron/common-library';
import { User } from '@ultron/core-library';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../constants';
import { CoreManager } from '../contracts';

export function cancelEmailAddressChange(container: Container) {
  const coreManager: CoreManager = container.get<CoreManager>(AUTH_CONSTANTS.Symbols.Services.CoreManager);

  return async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        confirmationCode
      }: {
        confirmationCode: string;
      } = req.body;

      const user: User = req.user as User;

      const information: Information = await coreManager.cancelEmailAddressChange(user, confirmationCode);

      res.status(200).send(SUCCESS<Information>(information));
    } catch (error: unknown) {
      res.status(500).send(FAILURE<Information>(error as Error));
    }
  };
}
