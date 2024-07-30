import { AccountHelper, DefineModuleFunction, UserHelper, VerificationRequestHelper } from '@ultron/core-library';
import { Container } from 'inversify';
import { MYSQL_CONSTANTS } from './constants';
import { provideConnection, provideRepositories } from './methods';
import { MySQLAccountHelper, MySQLUserHelper, MySQLVerificationRequestHelper } from './services';
import { ConnectionProvider, RepositoriesProvider } from './types';

export { MYSQL_CONSTANTS } from './constants';

export const defineMySQLModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<ConnectionProvider>(MYSQL_CONSTANTS.Symbols.Providers.ConnectionProvider).toProvider(provideConnection);
  container.bind<RepositoriesProvider>(MYSQL_CONSTANTS.Symbols.Providers.RepositoriesProvider).toProvider(provideRepositories);

  container.bind<AccountHelper>(MYSQL_CONSTANTS.Symbols.Services.UserHelper).to(MySQLAccountHelper);
  container.bind<UserHelper>(MYSQL_CONSTANTS.Symbols.Services.AccountHelper).to(MySQLUserHelper);
  container.bind<VerificationRequestHelper>(MYSQL_CONSTANTS.Symbols.Services.VerificationRequestHelper).to(MySQLVerificationRequestHelper);

  return container;
};
