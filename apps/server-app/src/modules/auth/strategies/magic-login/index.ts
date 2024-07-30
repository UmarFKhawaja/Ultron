import { DefineModuleFunction, SetupMiddlewareFunction, SetupRouterFunction } from '@ultron/core-library';
import { Express, Router } from 'express';
import { Container } from 'inversify';
import { SignOptions } from 'jsonwebtoken';
import passport from 'passport';
import Strategy from 'passport-magic-login';
import { AUTH_CONSTANTS } from '../../constants';
import { authenticateMagicLogin } from '../../methods';
import { acceptMagicLogin, loginWithMagicLogin, sendMagicLink, verifyUser } from './methods';
import { AuthMagicLoginStrategyProvider } from './services';
import { SendMagicLinkFunction, VerifyFunction } from './types';

type Options = {
  secret: string;
  callbackUrl: string;
  jwtOptions?: SignOptions;
  sendMagicLink: SendMagicLinkFunction;
  verify: VerifyFunction;
};

export const defineMagicLoginModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<AuthMagicLoginStrategyProvider>(AUTH_CONSTANTS.Symbols.Services.MagicLoginStrategyProvider).to(AuthMagicLoginStrategyProvider)
    .inRequestScope().whenTargetNamed(AUTH_CONSTANTS.Names.Services.MagicLoginStrategyProvider);

  return container;
};

export const setupMagicLoginMiddleware: SetupMiddlewareFunction = (app: Express, container: Container): Express => {
  const options: Options = {
    secret: AUTH_CONSTANTS.Strategies.MagicLogin.secret,
    jwtOptions: {
      expiresIn: AUTH_CONSTANTS.Strategies.MagicLogin.expiresIn
    },
    callbackUrl: AUTH_CONSTANTS.Strategies.MagicLogin.acceptPath,
    sendMagicLink: sendMagicLink(container),
    verify: verifyUser(container)
  };

  passport.use('magic-login', new Strategy(options));

  return app;
};

export const setupMagicLoginRouter: SetupRouterFunction = (router: Router, container: Container): Router => {
  router.post('/login/magic-login', loginWithMagicLogin(container));
  router.get('/accept/magic-login', authenticateMagicLogin(container), acceptMagicLogin(container));

  return router;
};
