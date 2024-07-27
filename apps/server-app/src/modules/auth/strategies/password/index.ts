import { DefineModuleFunction, SetupMiddlewareFunction, SetupRouterFunction } from '@ultron/core-library';
import { Express, Router } from 'express';
import { Container } from 'inversify';
import passport from 'passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { authenticatePassword, authenticateJWT } from '../../methods';
import {
  changePassword,
  loginWithPassword,
  recoverAccount,
  resetPassword,
  setPassword,
  unsetPassword,
  verifyUser
} from './methods';

export const definePasswordModule: DefineModuleFunction = (container: Container): Container => {
  return container;
};

export const setupPasswordMiddleware: SetupMiddlewareFunction = (app: Express, container: Container): Express => {
  const options: IStrategyOptions = {
    session: true
  };

  passport.use('password', new Strategy(options, verifyUser(container)));

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
