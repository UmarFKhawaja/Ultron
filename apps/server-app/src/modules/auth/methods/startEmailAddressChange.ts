import { FAILURE, Information, SUCCESS } from '@ultron/common-library';
import { User } from '@ultron/core-library';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../constants';
import { CoreService } from '../contracts';

export function startEmailAddressChange(container: Container) {
  const coreService: CoreService = container.get<CoreService>(AUTH_CONSTANTS.Symbols.Services.CoreService);

  return async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        emailAddress
      }: {
        emailAddress: string;
      } = req.body;

      const user: User = req.user as User;

      const information: Information = await coreService.startEmailAddressChange(user, emailAddress);

      res.status(200).send(SUCCESS<Information>(information));
    } catch (error: unknown) {
      res.status(500).send(FAILURE<Information>(error as Error));
    }
  };
}
