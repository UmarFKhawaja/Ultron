import { Container, interfaces } from 'inversify';
import { IStrategyOptions as StrategyOptions, Strategy } from 'passport-local';
import { StrategyProvider } from '../types';
import { verifyUser } from './verifyUser';

let strategy: Strategy;

export function providePasswordStrategy(context: interfaces.Context): StrategyProvider {
  const container: Container = context.container as Container

  return (): Strategy => {
    if (strategy) {
      return strategy;
    }

    const options: StrategyOptions = {
      session: true
    };

    strategy = new Strategy(options, verifyUser(container));

    return strategy;
  };
}
