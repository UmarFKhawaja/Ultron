import { SessionService } from '@ultron/core-library';
import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { Redis as Connection } from 'ioredis';
import { REDIS_CONSTANTS } from '../constants';
import { ConnectionProvider } from '../types';

@injectable()
export class RedisSessionService implements SessionService {
  constructor(
    @inject(REDIS_CONSTANTS.Symbols.Providers.ConnectionProvider)
    private readonly provideConnection: ConnectionProvider
  ) {
  }

  async hasSessionExpiry(id: string): Promise<boolean> {
    const connection: Connection = await this.provideConnection();

    const result: number = await connection.exists(`session:${id}`);

    return result > 0;
  }

  async getSessionExpiry(id: string): Promise<Date> {
    const connection: Connection = await this.provideConnection();

    const timestamp: number = parseInt(await connection.get(`session:${id}`) || '0');

    if (timestamp) {
      return new Date(timestamp);
    }

    throw new Error('session id does not exist');
  }

  async setSessionExpiry(id: string, expiresAt: Date): Promise<void> {
    const timestamp: number = expiresAt.valueOf();
    const ttl: number = dayjs(expiresAt).diff(dayjs(), 'seconds');

    const connection: Connection = await this.provideConnection();

    await connection.set(`session:${id}`, timestamp);
    await connection.expire(`session:${id}`, ttl);
  }

  async unsetSessionExpiry(id: string): Promise<void> {
    const connection: Connection = await this.provideConnection();

    await connection.del(`session:${id}`);
  }
}
