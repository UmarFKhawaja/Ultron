import { User } from '@ultron/core-library';
import { Container } from 'inversify';
import { VerifiedCallback as VerifiedFunction, VerifyCallback as VerifyFunction } from 'passport-jwt';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreManager } from '../../../contracts';

export function verifyUser(container: Container): VerifyFunction {
  const coreManager: CoreManager = container.get<CoreManager>(AUTH_CONSTANTS.Symbols.Services.CoreManager);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (payload: any, done: VerifiedFunction): Promise<void> => {
    try {
      const user: User = await coreManager.checkUserByID(payload.sub);

      done(null, user);
    } catch (error: unknown) {
      done(error);
    }
  };
}
