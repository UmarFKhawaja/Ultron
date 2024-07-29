import { Container } from 'inversify';
import passport from 'passport';

export function authenticateMagicLogin(container: Container) {
  return passport.authenticate('magic-login');
}
