import { AccountService, DefineModuleFunction, UserService, VerificationRequestService } from '@ultron/core-library';
import { Container } from 'inversify';
import { MYSQL_CONSTANTS } from './constants';
import { provideConnection, provideRepositories } from './methods';
import { MySQLAccountService, MySQLUserService, MySQLVerificationRequestService } from './services';
import { ConnectionProvider, RepositoriesProvider } from './types';

export { MYSQL_CONSTANTS } from './constants';

export const defineMySQLModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<ConnectionProvider>(MYSQL_CONSTANTS.Symbols.Providers.ConnectionProvider).toProvider(provideConnection);
  container.bind<RepositoriesProvider>(MYSQL_CONSTANTS.Symbols.Providers.RepositoriesProvider).toProvider(provideRepositories);

  container.bind<UserService>(MYSQL_CONSTANTS.Symbols.Services.UserService).to(MySQLUserService);
  container.bind<AccountService>(MYSQL_CONSTANTS.Symbols.Services.AccountService).to(MySQLAccountService);
  container.bind<VerificationRequestService>(MYSQL_CONSTANTS.Symbols.Services.VerificationRequestService).to(MySQLVerificationRequestService);

  return container;
};
