import { DefineModuleFunction, SetupMiddlewareFunction, SetupRouterFunction } from '@ultron/core-library';
import { Express, Router } from 'express';
import { Container } from 'inversify';
import passport from 'passport';
import { Strategy } from 'passport-facebook';
import { AUTH_CONSTANTS } from '../../constants';
import { ProfileExtractor } from '../../contracts';
import { authenticateFacebook, authorizeFacebook, authenticateJWT } from '../../methods';
import {
  acceptFacebook,
  connectFacebook,
  disconnectFacebook,
  loginWithFacebook,
  provideFacebookStrategy
} from './methods';
import { AuthFacebookProfileExtractor } from './services';
import { StrategyProvider } from './types';

export const defineFacebookModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<ProfileExtractor>(AUTH_CONSTANTS.Symbols.Services.ProfileExtractor).to(AuthFacebookProfileExtractor)
    .whenTargetNamed(AUTH_CONSTANTS.Names.Strategies.FacebookStrategy);

  container.bind<StrategyProvider>(AUTH_CONSTANTS.Symbols.Services.FacebookStrategyProvider).toFactory(provideFacebookStrategy)
    .whenTargetNamed(AUTH_CONSTANTS.Names.Strategies.FacebookStrategy);

  return container;
};

export const setupFacebookMiddleware: SetupMiddlewareFunction = (app: Express, container: Container): Express => {
  const provideStrategy: StrategyProvider = container.getNamed<StrategyProvider>(AUTH_CONSTANTS.Symbols.Services.FacebookStrategyProvider, AUTH_CONSTANTS.Names.Strategies.FacebookStrategy);

  const strategy: Strategy = provideStrategy();

  passport.use('facebook', strategy);

  return app;
};

export const setupFacebookRouter: SetupRouterFunction = (router: Router, container: Container): Router => {
  router.get('/login/facebook', authenticateFacebook(container), loginWithFacebook(container));
  router.get('/connect/facebook', authorizeFacebook(container), connectFacebook(container));
  router.get('/disconnect/facebook', authenticateJWT(container), disconnectFacebook(container));
  router.get('/accept/facebook', authenticateFacebook(container), acceptFacebook(container));

  return router;
};
