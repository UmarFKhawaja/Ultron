import { DefineModuleFunction, SetupMiddlewareFunction, SetupRouterFunction } from '@ultron/core-library';
import { Express, Router } from 'express';
import { Container } from 'inversify';
import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AUTH_CONSTANTS } from '../../constants';
import { verifyUser } from './methods';
import fromExtractors = ExtractJwt.fromExtractors;
import fromAuthHeaderAsBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken;
import fromUrlQueryParameter = ExtractJwt.fromUrlQueryParameter;

function fromAuthCookie(req: Request): string | null {
  // TODO : implement auth cookies
  return null;
}

export const defineJWTModule: DefineModuleFunction = (container: Container): Container => {
  return container;
};

export const setupJWTMiddleware: SetupMiddlewareFunction = (app: Express, container: Container): Express => {
  const options: StrategyOptions = {
    secretOrKey: AUTH_CONSTANTS.Strategies.JWT.secret,
    jwtFromRequest: fromExtractors([
      fromAuthCookie,
      fromAuthHeaderAsBearerToken(),
      fromUrlQueryParameter('token')
    ]),
    ignoreExpiration: false
  };

  passport.use('jwt', new Strategy(options, verifyUser));

  return app;
};

export const setupJWTRouter: SetupRouterFunction = (router: Router, container: Container): Router => {
  return router;
};
