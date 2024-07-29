import { Request, Response } from 'express';
import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../../../constants';
import { AuthMagicLoginStrategyService } from '../services';

export function loginWithMagicLogin(container: Container) {
  const strategyService: AuthMagicLoginStrategyService = container
    .getNamed<AuthMagicLoginStrategyService>(
      AUTH_CONSTANTS.Symbols.Services.MagicLoginStrategyService,
      AUTH_CONSTANTS.Names.Services.MagicLoginStrategyService
    );

  return async (req: Request, res: Response): Promise<void> => {
    strategyService.send(req, res);
  };
}
