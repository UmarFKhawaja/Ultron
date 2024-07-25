export const MYSQL_CONSTANTS = {
  Symbols: {
    Providers: {
      ConnectionProvider: 'MYSQL_CONNECTION_PROVIDER',
      RepositoriesProvider: 'MYSQL_REPOSITORIES_PROVIDER'
    },
    Services: {
      UserService: 'MYSQL_USER_SERVICE',
      AccountService: 'MYSQL_ACCOUNT_SERVICE',
      VerificationRequestService: 'MYSQL_VERIFICATION_REQUEST_SERVICE',
    }
  },
  Settings: {
    host: process.env['MYSQL_HOST'] || 'localhost',
    port: parseInt(process.env['MYSQL_PORT'] || '3306') || 3306,
    username: process.env['MYSQL_USERNAME'] || '',
    password: process.env['MYSQL_PASSWORD'] || '',
    database: process.env['MYSQL_DATABASE'] || 'ultron'
  }
};
