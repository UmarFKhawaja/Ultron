import { User } from '@ultron/core-library';
import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreService } from '../../../contracts';
import { VerifyFunction } from '../types';

export function verifyUser(container: Container): VerifyFunction {
  const coreService: CoreService = container.get<CoreService>(AUTH_CONSTANTS.Symbols.Services.CoreService);

  return async (payload: {
    destination: string
  }, callback: (error: Error | null | undefined, user: User | null | undefined) => void): Promise<void> => {
    try {
      const user: User = await coreService.getUserByUsername(payload.destination);

      if (!user.verifiedAt) {
        callback(new Error('the user with that username was not verified'), null);
      } else {
        callback(null, user);
      }
    } catch (error: unknown) {
      callback(error as Error, null);
    }
  };
}
