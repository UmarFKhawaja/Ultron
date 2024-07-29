import { Container } from 'inversify';
import passport from 'passport';

export function authorizeGoogle(container: Container) {
  return passport.authorize('google');
}
