import { Container, interfaces } from 'inversify';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { AUTH_CONSTANTS } from '../../../constants';
import { StrategyProvider } from '../types';
import { verifyUser } from './verifyUser';

let strategy: Strategy;

export function provideGoogleStrategy(context: interfaces.Context): StrategyProvider {
  const container: Container = context.container as Container

  return (): Strategy => {
    if (strategy) {
      return strategy;
    }

    const options: StrategyOptions = {
      clientID: AUTH_CONSTANTS.Strategies.Google.clientID,
      clientSecret: AUTH_CONSTANTS.Strategies.Google.clientSecret,
      callbackURL: new URL(AUTH_CONSTANTS.Strategies.Google.acceptPath, AUTH_CONSTANTS.Strategies.Google.acceptURL).toString(),
      scope: [
        'email',
        'profile'
      ]
    };

    strategy = new Strategy(options, verifyUser(container));

    return strategy;
  };
}
