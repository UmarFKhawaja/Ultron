import { Redis as Connection } from 'ioredis';
import { REDIS_CONSTANTS } from '../constants';
import { ConnectionProvider } from '../types';

export function provideConnection(): ConnectionProvider {
  return async (): Promise<Connection> => {
    const options = {
      host: REDIS_CONSTANTS.Settings.host,
      port: REDIS_CONSTANTS.Settings.port,
      ...(REDIS_CONSTANTS.Settings.username ? {
        username: REDIS_CONSTANTS.Settings.username
      } : {}),
      ...(REDIS_CONSTANTS.Settings.password ? {
        password: REDIS_CONSTANTS.Settings.password
      } : {})
    };

    const connection: Connection = new Connection(options);

    return connection;
  };
}
