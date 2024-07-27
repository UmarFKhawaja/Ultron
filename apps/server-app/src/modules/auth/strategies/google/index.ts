import {
  DefineModuleFunction,
  ProfileService,
  SetupMiddlewareFunction,
  SetupRouterFunction
} from '@ultron/core-library';
import { Express, Router } from 'express';
import { Container } from 'inversify';
import passport from 'passport';
import { StrategyOptions, Strategy } from 'passport-google-oauth20';
import { AUTH_CONSTANTS } from '../../constants';
import { authenticateGoogle, authorizeGoogle, authenticateJWT } from '../../methods';
import { acceptGoogle, connectGoogle, disconnectGoogle, loginWithGoogle, verifyUser } from './methods';
import { AuthGoogleProfileService } from './services';

export const defineGoogleModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<ProfileService>(AUTH_CONSTANTS.Symbols.Services.ProfileService).to(AuthGoogleProfileService)
    .whenTargetNamed(AUTH_CONSTANTS.Names.Services.Google);

  return container;
};

export const setupGoogleMiddleware: SetupMiddlewareFunction = (app: Express, container: Container): Express => {
  const options: StrategyOptions = {
    clientID: AUTH_CONSTANTS.Strategies.Google.clientID,
    clientSecret: AUTH_CONSTANTS.Strategies.Google.clientSecret,
    callbackURL: new URL(AUTH_CONSTANTS.Strategies.Google.acceptPath, AUTH_CONSTANTS.Strategies.Google.acceptURL).toString(),
    scope: [
      'email',
      'profile'
    ]
  };

  passport.use('google', new Strategy(options, verifyUser(container)));

  return app;
};

export const setupGoogleRouter: SetupRouterFunction = (router: Router, container: Container): Router => {
  router.get('/login/google', authenticateGoogle(container), loginWithGoogle(container));
  router.get('/connect/google', authorizeGoogle(container), connectGoogle(container));
  router.get('/disconnect/google', authenticateJWT(container), disconnectGoogle(container));
  router.get('/accept/google', authenticateGoogle(container), acceptGoogle(container));

  return router;
};