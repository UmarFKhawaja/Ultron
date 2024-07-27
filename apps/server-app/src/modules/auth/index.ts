import {
  DefineModuleFunction,
  mountRouters,
  populateContainer,
  SetupMiddlewareFunction,
  SetupRouterFunction,
  useMiddlewares
} from '@ultron/core-library';
import { Express, Router } from 'express';
import session from 'express-session';
import { Container } from 'inversify';
import passport from 'passport';
import { AUTH_CONSTANTS } from './constants';
import {
  activateAccount,
  authenticateJWT,
  cancelEmailAddressChange,
  completeEmailAddressChange,
  confirmEmailAddressChange,
  getInformation,
  logout,
  register,
  requestActivationCode,
  resendEmailAddressChange,
  startEmailAddressChange,
  updateProfile,
  verifySession
} from './methods';
import {
  AuthCoreService,
  AuthJWTService,
  AuthTokenService,
  AuthURLService,
  AuthUserService,
  AuthVerificationRequestService
} from './services';
import { defineFacebookModule, setupFacebookMiddleware, setupFacebookRouter } from './strategies/facebook';
import { defineGoogleModule, setupGoogleMiddleware, setupGoogleRouter } from './strategies/google';
import { defineJWTModule, setupJWTMiddleware, setupJWTRouter } from './strategies/jwt';
import { defineMagicLoginModule, setupMagicLoginMiddleware, setupMagicLoginRouter } from './strategies/magic-login';
import { definePasswordModule, setupPasswordMiddleware, setupPasswordRouter } from './strategies/password';

export const defineAuthModule: DefineModuleFunction = (container: Container): Container => {
  container = populateContainer(
    container,
    definePasswordModule,
    defineMagicLoginModule,
    defineJWTModule,
    defineFacebookModule,
    defineGoogleModule
  );

  container.bind<AuthCoreService>(AUTH_CONSTANTS.Symbols.Services.CoreService).to(AuthCoreService).inRequestScope();
  container.bind<AuthJWTService>(AUTH_CONSTANTS.Symbols.Services.JWTService).to(AuthJWTService).inRequestScope();
  container.bind<AuthTokenService>(AUTH_CONSTANTS.Symbols.Services.TokenService).to(AuthTokenService).inRequestScope();
  container.bind<AuthURLService>(AUTH_CONSTANTS.Symbols.Services.URLService).to(AuthURLService).inRequestScope();
  container.bind<AuthUserService>(AUTH_CONSTANTS.Symbols.Services.UserService).to(AuthUserService).inRequestScope();
  container.bind<AuthVerificationRequestService>(AUTH_CONSTANTS.Symbols.Services.VerificationRequestService).to(AuthVerificationRequestService).inRequestScope();

  return container;
};

export const setupAuthMiddleware: SetupMiddlewareFunction = (app: Express, container: Container) => {
  app.use(session({
    secret: AUTH_CONSTANTS.Settings.Session.secret,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.session());

  app = useMiddlewares(
    app,
    container,
    setupPasswordMiddleware,
    setupMagicLoginMiddleware,
    setupJWTMiddleware,
    setupFacebookMiddleware,
    setupGoogleMiddleware
  );

  return app;
};

export const setupAuthRouter: SetupRouterFunction = (router: Router, container: Container): Router => {
  router = mountRouters(
    router,
    container,
    setupPasswordRouter,
    setupMagicLoginRouter,
    setupJWTRouter,
    setupFacebookRouter,
    setupGoogleRouter
  );

  router.post('/register', register(container));
  router.post('/request-activation-code', requestActivationCode(container));
  router.post('/activate-account', activateAccount(container));
  router.post('/logout', authenticateJWT(container), logout(container));
  router.get('/verify-session', authenticateJWT(container), verifySession(container));
  router.get('/get-information', authenticateJWT(container), getInformation(container));
  router.post('/update-profile', authenticateJWT(container), updateProfile(container));
  router.post('/start-email-address-change', authenticateJWT(container), startEmailAddressChange(container));
  router.post('/confirm-email-address-change', authenticateJWT(container), confirmEmailAddressChange(container));
  router.post('/complete-email-address-change', authenticateJWT(container), completeEmailAddressChange(container));
  router.post('/cancel-email-address-change', authenticateJWT(container), cancelEmailAddressChange(container));
  router.post('/resend-email-address-change', authenticateJWT(container), resendEmailAddressChange(container));

  return router;
};
