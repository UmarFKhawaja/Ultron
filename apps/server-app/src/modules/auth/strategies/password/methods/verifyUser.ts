import { User } from '@ultron/core-library';
import { Container } from 'inversify';
import { IVerifyOptions, VerifyFunction } from 'passport-local';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreManager } from '../../../contracts';

type DoneFunction = (error: any, user?: (Express.User | false), options?: IVerifyOptions) => void;

export function verifyUser(container: Container): VerifyFunction {
  const coreManager: CoreManager = container.get<CoreManager>(AUTH_CONSTANTS.Symbols.Services.CoreManager);

  return async (username: string, password: string, done: DoneFunction): Promise<void> => {
    try {
      const user: User = await coreManager.checkUserByUsernameAndPassword(username, password);

      done(null, user);
    } catch (error: unknown) {
      done(error);
    }
  };
}
