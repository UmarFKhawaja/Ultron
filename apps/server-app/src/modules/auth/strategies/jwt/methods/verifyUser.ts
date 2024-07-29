import { User } from '@ultron/core-library';
import { Container } from 'inversify';
import { VerifiedCallback as VerifiedFunction, VerifyCallback as VerifyFunction } from 'passport-jwt';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreService } from '../../../contracts';

export function verifyUser(container: Container): VerifyFunction {
  const coreService: CoreService = container.get<CoreService>(AUTH_CONSTANTS.Symbols.Services.CoreService);

  return async (payload: any, done: VerifiedFunction): Promise<void> => {
    try {
      const user: User = await coreService.checkUserByID(payload.sub);

      done(null, user);
    } catch (error: unknown) {
      done(error);
    }
  };
}
