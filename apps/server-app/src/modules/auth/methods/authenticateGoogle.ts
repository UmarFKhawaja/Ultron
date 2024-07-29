import { Container } from 'inversify';
import passport from 'passport';

export function authenticateGoogle(container: Container) {
  return passport.authenticate('google');
}
