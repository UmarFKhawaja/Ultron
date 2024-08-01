import { Container, interfaces } from 'inversify';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AUTH_CONSTANTS } from '../../../constants';
import { StrategyProvider } from '../types';
import { verifyUser } from './verifyUser';
import fromUrlQueryParameter = ExtractJwt.fromUrlQueryParameter;
import fromAuthHeaderAsBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken;
import fromExtractors = ExtractJwt.fromExtractors;

let strategy: Strategy;

function fromAuthCookie(req: Request): string | null {
  // TODO : implement auth cookies
  return null;
}

export function provideJWTStrategy(context: interfaces.Context): StrategyProvider {
  const container: Container = context.container as Container

  return (): Strategy => {
    if (strategy) {
      return strategy;
    }

    const options: StrategyOptions = {
      secretOrKey: AUTH_CONSTANTS.Strategies.JWT.secret,
      jwtFromRequest: fromExtractors([
        fromAuthCookie,
        fromAuthHeaderAsBearerToken(),
        fromUrlQueryParameter('token')
      ]),
      ignoreExpiration: false
    };

    strategy = new Strategy(options, verifyUser(container));

    return strategy;
  };
}
