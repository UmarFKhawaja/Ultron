import { Container } from 'inversify';
import { REDIS_CONSTANTS } from './constants';
import { provideConnection } from './methods';
import { RedisMailSender, RedisMessageWatcher, RedisSessionManager } from './services';
import { ConnectionProvider } from './types';
import { DefineModuleFunction, MailSender, MessageWatcher, SessionManager } from '@ultron/core-library';

export { REDIS_CONSTANTS } from './constants';

export const defineRedisModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<ConnectionProvider>(REDIS_CONSTANTS.Symbols.Providers.ConnectionProvider).toProvider(provideConnection);

  container.bind<MailSender>(REDIS_CONSTANTS.Symbols.Services.MailSender).to(RedisMailSender).inRequestScope();
  container.bind<MessageWatcher>(REDIS_CONSTANTS.Symbols.Services.MessageWatcher).to(RedisMessageWatcher).inRequestScope();
  container.bind<SessionManager>(REDIS_CONSTANTS.Symbols.Services.SessionManager).to(RedisSessionManager).inRequestScope();

  return container;
};
