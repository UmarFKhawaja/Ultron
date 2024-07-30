import { Request, Response } from 'express';
import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../../../constants';
import { AuthMagicLoginStrategyProvider } from '../services';

export function loginWithMagicLogin(container: Container) {
  const strategyProvider: AuthMagicLoginStrategyProvider = container
    .getNamed<AuthMagicLoginStrategyProvider>(
      AUTH_CONSTANTS.Symbols.Services.MagicLoginStrategyProvider,
      AUTH_CONSTANTS.Names.Services.MagicLoginStrategyProvider
    );

  return async (req: Request, res: Response): Promise<void> => {
    strategyProvider.send(req, res);
  };
}
