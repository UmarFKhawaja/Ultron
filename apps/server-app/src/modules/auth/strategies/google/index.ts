import { DefineModuleFunction, SetupMiddlewareFunction, SetupRouterFunction } from '@ultron/core-library';
import { Express, Router } from 'express';
import { Container } from 'inversify';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { AUTH_CONSTANTS } from '../../constants';
import { ProfileExtractor } from '../../contracts';
import { authenticateGoogle, authorizeGoogle, authenticateJWT } from '../../methods';
import {
  acceptGoogle,
  connectGoogle,
  disconnectGoogle,
  loginWithGoogle,
  provideGoogleStrategy
} from './methods';
import { AuthGoogleProfileExtractor } from './services';
import { StrategyProvider } from './types';

export const defineGoogleModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<ProfileExtractor>(AUTH_CONSTANTS.Symbols.Services.ProfileExtractor).to(AuthGoogleProfileExtractor)
    .whenTargetNamed(AUTH_CONSTANTS.Names.Strategies.GoogleStrategy);

  container.bind<StrategyProvider>(AUTH_CONSTANTS.Symbols.Services.GoogleStrategyProvider).toFactory(provideGoogleStrategy)
    .whenTargetNamed(AUTH_CONSTANTS.Names.Strategies.GoogleStrategy);

  return container;
};

export const setupGoogleMiddleware: SetupMiddlewareFunction = (app: Express, container: Container): Express => {
  const provideStrategy: StrategyProvider = container.getNamed<StrategyProvider>(AUTH_CONSTANTS.Symbols.Services.GoogleStrategyProvider, AUTH_CONSTANTS.Names.Strategies.GoogleStrategy);

  const strategy: Strategy = provideStrategy();

  passport.use('google', strategy);

  return app;
};

export const setupGoogleRouter: SetupRouterFunction = (router: Router, container: Container): Router => {
  router.get('/login/google', authenticateGoogle(container), loginWithGoogle(container));
  router.get('/connect/google', authorizeGoogle(container), connectGoogle(container));
  router.get('/disconnect/google', authenticateJWT(container), disconnectGoogle(container));
  router.get('/accept/google', authenticateGoogle(container), acceptGoogle(container));

  return router;
};
