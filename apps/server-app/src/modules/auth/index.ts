import { DefineModuleFunction, SetupMiddlewareFunction, SetupRouterFunction } from '@ultron/core-library';
import { Express, Router } from 'express';
import { Container } from 'inversify';
import {
  activateAccount,
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

export const defineAuthModule: DefineModuleFunction = (container: Container): Container => {
  return container;
};

export const setupAuthMiddleware: SetupMiddlewareFunction = (app: Express, container: Container) => {
  return app;
};

export const setupAuthRouter: SetupRouterFunction = (router: Router, container: Container): Router => {
  router.post('/register', register(container));
  router.post('/request-activation-code', requestActivationCode(container));
  router.post('/activate-account', activateAccount(container));
  router.post('/logout', logout(container));
  router.get('/verify-session', verifySession(container));
  router.get('/get-information', getInformation(container));
  router.post('/update-profile', updateProfile(container));
  router.post('/start-email-address-change', startEmailAddressChange(container));
  router.post('/confirm-email-address-change', confirmEmailAddressChange(container));
  router.post('/complete-email-address-change', completeEmailAddressChange(container));
  router.post('/cancel-email-address-change', cancelEmailAddressChange(container));
  router.post('/resend-email-address-change', resendEmailAddressChange(container));

  return router;
};
