import { DefineModuleFunction, SetupMiddlewareFunction, SetupRouterFunction } from '@ultron/core-library';
import { Express, Router } from 'express';
import { Container } from 'inversify';
import passport from 'passport';
import { Strategy, StrategyOptions } from 'passport-facebook';
import { AUTH_CONSTANTS } from '../../constants';
import { ProfileExtractor } from '../../contracts';
import { authenticateFacebook, authorizeFacebook, authenticateJWT } from '../../methods';
import { acceptFacebook, connectFacebook, disconnectFacebook, loginWithFacebook, verifyUser } from './methods';
import { AuthFacebookProfileExtractor } from './services';

export const defineFacebookModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<ProfileExtractor>(AUTH_CONSTANTS.Symbols.Services.ProfileExtractor).to(AuthFacebookProfileExtractor)
    .whenTargetNamed(AUTH_CONSTANTS.Names.Services.FacebookProfileExtractor);

  return container;
};

export const setupFacebookMiddleware: SetupMiddlewareFunction = (app: Express, container: Container): Express => {
  const options: StrategyOptions = {
    clientID: AUTH_CONSTANTS.Strategies.Facebook.clientID,
    clientSecret: AUTH_CONSTANTS.Strategies.Facebook.clientSecret,
    callbackURL: new URL(AUTH_CONSTANTS.Strategies.Facebook.acceptPath, AUTH_CONSTANTS.Strategies.Facebook.acceptURL).toString(),
    scope: [
      'email',
      'public_profile'
    ],
    profileFields: [
      'id',
      'displayName',
      'email'
    ]
  };

  passport.use('facebook', new Strategy(options, verifyUser(container)));

  return app;
};

export const setupFacebookRouter: SetupRouterFunction = (router: Router, container: Container): Router => {
  router.get('/login/facebook', authenticateFacebook(container), loginWithFacebook(container));
  router.get('/connect/facebook', authorizeFacebook(container), connectFacebook(container));
  router.get('/disconnect/facebook', authenticateJWT(container), disconnectFacebook(container));
  router.get('/accept/facebook', authenticateFacebook(container), acceptFacebook(container));

  return router;
};
