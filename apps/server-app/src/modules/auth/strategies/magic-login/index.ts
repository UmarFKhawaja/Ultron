import { DefineModuleFunction, SetupMiddlewareFunction, SetupRouterFunction } from '@ultron/core-library';
import { Express, Router } from 'express';
import { Container } from 'inversify';
import passport from 'passport';
import Strategy from 'passport-magic-login';
import { AUTH_CONSTANTS } from '../../constants';
import { authenticateMagicLogin } from '../../methods';
import { acceptMagicLogin, loginWithMagicLogin, provideMagicLoginStrategy } from './methods';
import { StrategyProvider } from './types';

export const defineMagicLoginModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<StrategyProvider>(AUTH_CONSTANTS.Symbols.Services.MagicLoginStrategyProvider).toFactory(provideMagicLoginStrategy)
    .whenTargetNamed(AUTH_CONSTANTS.Names.Strategies.MagicLoginStrategy);

  return container;
};

export const setupMagicLoginMiddleware: SetupMiddlewareFunction = (app: Express, container: Container): Express => {
  const provideStrategy: StrategyProvider = container.getNamed<StrategyProvider>(AUTH_CONSTANTS.Symbols.Services.MagicLoginStrategyProvider, AUTH_CONSTANTS.Names.Strategies.MagicLoginStrategy);

  const strategy: Strategy = provideStrategy();

  passport.use('magic-login', strategy);

  return app;
};

export const setupMagicLoginRouter: SetupRouterFunction = (router: Router, container: Container): Router => {
  router.post('/login/magic-login', loginWithMagicLogin(container));
  router.get('/accept/magic-login', authenticateMagicLogin(container), acceptMagicLogin(container));

  return router;
};
