import { Container } from 'inversify';
import passport from 'passport';

export function authenticatePassword(container: Container) {
  return passport.authenticate('password');
}
