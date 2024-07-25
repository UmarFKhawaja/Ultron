import { Account, User, VerificationRequest } from '@ultron/core-library';
import { DataSource as Connection } from 'typeorm';
import { MYSQL_CONSTANTS } from '../constants';
import { ConnectionProvider } from '../types';

export function provideConnection(): ConnectionProvider {
  return async (): Promise<Connection> => {
    let connection: Connection = new Connection({
      type: 'mysql',
      host: MYSQL_CONSTANTS.Settings.host,
      port: MYSQL_CONSTANTS.Settings.port,
      database: MYSQL_CONSTANTS.Settings.database,
      username: MYSQL_CONSTANTS.Settings.username,
      password: MYSQL_CONSTANTS.Settings.password,
      entities: [
        User,
        Account,
        VerificationRequest
      ],
      migrations: [],
      subscribers: [],
      migrationsRun: false,
      migrationsTableName: 'migration',
      migrationsTransactionMode: 'all'
    });

    if (!connection.isInitialized) {
      connection = await connection.initialize();
    }

    return connection;
  };
}
