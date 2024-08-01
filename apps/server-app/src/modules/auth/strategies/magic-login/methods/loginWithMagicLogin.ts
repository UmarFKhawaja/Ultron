import { Request, Response } from 'express';
import { Container } from 'inversify';
import Strategy from 'passport-magic-login';
import { AUTH_CONSTANTS } from '../../../constants';
import { StrategyProvider } from '../types';

export function loginWithMagicLogin(container: Container) {
  const provideStrategy: StrategyProvider = container
    .getNamed<StrategyProvider>(
      AUTH_CONSTANTS.Symbols.Services.MagicLoginStrategyProvider,
      AUTH_CONSTANTS.Names.Strategies.MagicLoginStrategy
    );

  const strategy: Strategy = provideStrategy();

  return async (req: Request, res: Response): Promise<void> => {
    strategy.send(req, res);
  };
}
