import { deserializeJSON, MessageService, Task } from '@ultron/core-library';
import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { Redis as Connection } from 'ioredis';
import { REDIS_CONSTANTS } from '../constants';
import { ConnectionProvider } from '../types';

@injectable()
export class RedisMessageService implements MessageService {
  constructor(
    @inject(REDIS_CONSTANTS.Symbols.Providers.ConnectionProvider)
    private readonly provideConnection: ConnectionProvider
  ) {
  }

  async watchForMessages(handleTask: (task: Task) => Promise<void>): Promise<void> {
    const connection: Connection = await this.provideConnection();

    connection.subscribe(REDIS_CONSTANTS.Names.Notifications);
    connection.on('message', async (channel: string, message: string): Promise<void> => {
      const task: Task = {
        ...deserializeJSON<Task>(message),
        updatedAt: dayjs().toDate()
      };

      await handleTask(task);
    });
  }
}
