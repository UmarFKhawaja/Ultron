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
import { CoreManager, JWTManager, TokenManager, URLFormatter } from './contracts';
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
  AuthCoreManager,
  AuthJWTManager,
  AuthTokenManager,
  AuthURLFormatter,
  AuthUserManager,
  AuthVerificationRequestManager
} from './services';
import { defineFacebookModule, setupFacebookMiddleware, setupFacebookRouter } from './strategies/facebook';
import { defineGoogleModule, setupGoogleMiddleware, setupGoogleRouter } from './strategies/google';
import { defineJWTModule, setupJWTMiddleware, setupJWTRouter } from './strategies/jwt';
import { defineMagicLoginModule, setupMagicLoginMiddleware, setupMagicLoginRouter } from './strategies/magic-login';
import { definePasswordModule, setupPasswordMiddleware, setupPasswordRouter } from './strategies/password';

export const defineAuthModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<CoreManager>(AUTH_CONSTANTS.Symbols.Services.CoreManager).to(AuthCoreManager).inRequestScope();
  container.bind<JWTManager>(AUTH_CONSTANTS.Symbols.Services.JWTManager).to(AuthJWTManager).inRequestScope();
  container.bind<TokenManager>(AUTH_CONSTANTS.Symbols.Services.TokenManager).to(AuthTokenManager).inRequestScope();
  container.bind<URLFormatter>(AUTH_CONSTANTS.Symbols.Services.URLFormatter).to(AuthURLFormatter).inRequestScope();
  container.bind<AuthUserManager>(AUTH_CONSTANTS.Symbols.Services.UserManager).to(AuthUserManager).inRequestScope();
  container.bind<AuthVerificationRequestManager>(AUTH_CONSTANTS.Symbols.Services.VerificationRequestManager).to(AuthVerificationRequestManager).inRequestScope();

  container = populateContainer(
    container,
    definePasswordModule,
    defineMagicLoginModule,
    defineJWTModule,
    defineFacebookModule,
    defineGoogleModule
  );

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
