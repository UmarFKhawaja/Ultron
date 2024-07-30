import { User } from '@ultron/core-library';
import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreManager } from '../../../contracts';
import { VerifyFunction } from '../types';

export function verifyUser(container: Container): VerifyFunction {
  const coreManager: CoreManager = container.get<CoreManager>(AUTH_CONSTANTS.Symbols.Services.CoreManager);

  return async (payload: {
    destination: string
  }, callback: (error: Error | null | undefined, user: User | null | undefined) => void): Promise<void> => {
    try {
      const user: User = await coreManager.getUserByUsername(payload.destination);

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
