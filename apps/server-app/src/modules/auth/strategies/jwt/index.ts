import { DefineModuleFunction, SetupMiddlewareFunction, SetupRouterFunction } from '@ultron/core-library';
import { Express, Router } from 'express';
import { Container } from 'inversify';
import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { AUTH_CONSTANTS } from '../../constants';
import { provideJWTStrategy } from './methods';
import { StrategyProvider } from './types';

export const defineJWTModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<StrategyProvider>(AUTH_CONSTANTS.Symbols.Services.JWTStrategyProvider).toFactory(provideJWTStrategy)
    .whenTargetNamed(AUTH_CONSTANTS.Names.Strategies.JWTStrategy);

  return container;
};

export const setupJWTMiddleware: SetupMiddlewareFunction = (app: Express, container: Container): Express => {
  const provideStrategy: StrategyProvider = container.getNamed<StrategyProvider>(AUTH_CONSTANTS.Symbols.Services.JWTStrategyProvider, AUTH_CONSTANTS.Names.Strategies.JWTStrategy);

  const strategy: Strategy = provideStrategy();

  passport.use('jwt', strategy);

  return app;
};

export const setupJWTRouter: SetupRouterFunction = (router: Router, container: Container): Router => {
  return router;
};
