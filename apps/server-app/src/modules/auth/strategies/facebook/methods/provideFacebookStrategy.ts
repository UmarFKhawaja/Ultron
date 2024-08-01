import { Container, interfaces } from 'inversify';
import { Strategy, StrategyOptions } from 'passport-facebook';
import { AUTH_CONSTANTS } from '../../../constants';
import { StrategyProvider } from '../types';
import { verifyUser } from './verifyUser';

let strategy: Strategy;

export function provideFacebookStrategy(context: interfaces.Context): StrategyProvider {
  const container: Container = context.container as Container

  return (): Strategy => {
    if (strategy) {
      return strategy;
    }

    const options: StrategyOptions = {
      clientID: AUTH_CONSTANTS.Strategies.Facebook.clientID,
      clientSecret: AUTH_CONSTANTS.Strategies.Facebook.clientSecret,
      callbackURL: new URL(AUTH_CONSTANTS.Strategies.Facebook.acceptPath, AUTH_CONSTANTS.Strategies.Facebook.acceptURL).toString(),
      scope: [
        'email',
        'public_profile'
      ],
      profileFields: [
        'id',
        'displayName',
        'email'
      ]
    };

    strategy = new Strategy(options, verifyUser(container));

    return strategy;
  };
}
