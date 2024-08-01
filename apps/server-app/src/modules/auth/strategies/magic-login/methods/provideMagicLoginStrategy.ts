import { Container, interfaces } from 'inversify';
import { SignOptions } from 'jsonwebtoken';
import Strategy from 'passport-magic-login';
import { AUTH_CONSTANTS } from '../../../constants';
import { SendMagicLinkFunction, StrategyProvider, VerifyFunction } from '../types';
import { sendMagicLink } from './sendMagicLink';
import { verifyUser } from './verifyUser';

type Options = {
  secret: string;
  callbackUrl: string;
  jwtOptions?: SignOptions;
  sendMagicLink: SendMagicLinkFunction;
  verify: VerifyFunction;
};

let strategy: Strategy;

export function provideMagicLoginStrategy(context: interfaces.Context): StrategyProvider {
  const container: Container = context.container as Container

  return (): Strategy => {
    if (strategy) {
      return strategy;
    }

    const options: Options = {
      secret: AUTH_CONSTANTS.Strategies.MagicLogin.secret,
      jwtOptions: {
        expiresIn: AUTH_CONSTANTS.Strategies.MagicLogin.expiresIn
      },
      callbackUrl: AUTH_CONSTANTS.Strategies.MagicLogin.acceptPath,
      sendMagicLink: sendMagicLink(container),
      verify: verifyUser(container)
    };

    strategy = new Strategy(options);

    return strategy;
  };
}
