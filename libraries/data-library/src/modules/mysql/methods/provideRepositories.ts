import { Account, User, VerificationRequest } from '@ultron/core-library';
import { interfaces } from 'inversify';
import { DataSource as Connection, Repository } from 'typeorm';
import { MYSQL_CONSTANTS } from '../constants';
import { ConnectionProvider, RepositoriesProvider } from '../types';

export function provideRepositories(context: interfaces.Context): RepositoriesProvider {
  const provideConnection: ConnectionProvider = context.container.get<ConnectionProvider>(MYSQL_CONSTANTS.Symbols.Providers.ConnectionProvider);

  return async (): Promise<{
    userRepository: Repository<User>;
    accountRepository: Repository<Account>;
    verificationRequestRepository: Repository<VerificationRequest>;
  }> => {
    const connection: Connection = await provideConnection();
    const userRepository: Repository<User> = connection.getRepository(User);
    const accountRepository: Repository<Account> = connection.getRepository(Account);
    const verificationRequestRepository: Repository<VerificationRequest> = connection.getRepository(VerificationRequest);

    return {
      userRepository,
      accountRepository,
      verificationRequestRepository
    };
  }
}
