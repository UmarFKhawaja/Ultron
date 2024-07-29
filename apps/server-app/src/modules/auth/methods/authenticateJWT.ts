import { Container } from 'inversify';
import passport from 'passport';

export function authenticateJWT(container: Container) {
  return passport.authenticate('jwt');
}
