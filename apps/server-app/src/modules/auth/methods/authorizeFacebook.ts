import { Container } from 'inversify';
import passport from 'passport';

export function authorizeFacebook(container: Container) {
  return passport.authorize('facebook');
}
