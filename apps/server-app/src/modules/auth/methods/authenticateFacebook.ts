import { Container } from 'inversify';
import passport from 'passport';

export function authenticateFacebook(container: Container) {
  return passport.authenticate('facebook');
}
