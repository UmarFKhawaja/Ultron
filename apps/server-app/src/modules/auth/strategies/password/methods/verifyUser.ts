import { User } from '@ultron/core-library';
import { Container } from 'inversify';
import { IVerifyOptions, VerifyFunction } from 'passport-local';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreService } from '../../../contracts';

type DoneFunction = (error: any, user?: (Express.User | false), options?: IVerifyOptions) => void;

export function verifyUser(container: Container): VerifyFunction {
  const coreService: CoreService = container.get<CoreService>(AUTH_CONSTANTS.Symbols.Services.CoreService);

  return async (username: string, password: string, done: DoneFunction): Promise<void> => {
    try {
      const user: User = await coreService.checkUserByUsernameAndPassword(username, password);

      done(null, user);
    } catch (error: unknown) {
      done(error);
    }
  };
}
