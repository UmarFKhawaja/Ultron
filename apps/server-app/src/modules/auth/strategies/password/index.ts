import { DefineModuleFunction, SetupMiddlewareFunction, SetupRouterFunction } from '@ultron/core-library';
import { Express, Router } from 'express';
import { Container } from 'inversify';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { AUTH_CONSTANTS } from '../../constants';
import { authenticatePassword, authenticateJWT } from '../../methods';
import {
  changePassword,
  loginWithPassword,
  providePasswordStrategy,
  recoverAccount,
  resetPassword,
  setPassword,
  unsetPassword
} from './methods';
import { StrategyProvider } from './types';

export const definePasswordModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<StrategyProvider>(AUTH_CONSTANTS.Symbols.Services.PasswordStrategyProvider).toFactory(providePasswordStrategy)
    .whenTargetNamed(AUTH_CONSTANTS.Names.Strategies.PasswordStrategy);

  return container;
};

export const setupPasswordMiddleware: SetupMiddlewareFunction = (app: Express, container: Container): Express => {
  const provideStrategy: StrategyProvider = container.getNamed<StrategyProvider>(AUTH_CONSTANTS.Symbols.Services.PasswordStrategyProvider, AUTH_CONSTANTS.Names.Strategies.PasswordStrategy);

  const strategy: Strategy = provideStrategy();

  passport.use('password', strategy);

  return app;
};

export const setupPasswordRouter: SetupRouterFunction = (router: Router, container: Container): Router => {
  router.post('/login/password', authenticatePassword(container), loginWithPassword(container));
  router.post('/recover-account', recoverAccount(container));
  router.get('/reset-password', authenticateJWT(container), resetPassword(container));
  router.post('/change-password', authenticateJWT(container), changePassword(container));
  router.post('/set-password', authenticateJWT(container), setPassword(container));
  router.post('/unset-password', authenticateJWT(container), unsetPassword(container));

  return router;
};
