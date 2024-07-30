export const MYSQL_CONSTANTS = {
  Symbols: {
    Providers: {
      ConnectionProvider: 'MYSQL_CONNECTION_PROVIDER',
      RepositoriesProvider: 'MYSQL_REPOSITORIES_PROVIDER'
    },
    Services: {
      UserHelper: 'MYSQL_USER_HELPER',
      AccountHelper: 'MYSQL_ACCOUNT_HELPER',
      VerificationRequestHelper: 'MYSQL_VERIFICATION_REQUEST_HELPER',
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
