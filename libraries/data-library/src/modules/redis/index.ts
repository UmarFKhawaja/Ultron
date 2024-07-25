import { Container } from 'inversify';
import { REDIS_CONSTANTS } from './constants';
import { provideConnection } from './methods';
import { RedisMailService, RedisMessageService, RedisSessionService } from './services';
import { ConnectionProvider } from './types';
import { DefineModuleFunction, MailService, MessageService, SessionService } from '@ultron/core-library';

export { REDIS_CONSTANTS } from './constants';

export const defineRedisModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<ConnectionProvider>(REDIS_CONSTANTS.Symbols.Providers.ConnectionProvider).toProvider(provideConnection);

  container.bind<MailService>(REDIS_CONSTANTS.Symbols.Services.MailService).to(RedisMailService).inRequestScope();
  container.bind<MessageService>(REDIS_CONSTANTS.Symbols.Services.MessageService).to(RedisMessageService).inRequestScope();
  container.bind<SessionService>(REDIS_CONSTANTS.Symbols.Services.SessionService).to(RedisSessionService).inRequestScope();

  return container;
};
