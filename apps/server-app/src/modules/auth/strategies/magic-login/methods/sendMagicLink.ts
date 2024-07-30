import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreManager } from '../../../contracts';
import { SendMagicLinkFunction } from '../types';

export function sendMagicLink(container: Container): SendMagicLinkFunction {
  const coreManager: CoreManager = container.get<CoreManager>(AUTH_CONSTANTS.Symbols.Services.CoreManager);

  return async (username: string, confirmationURL: string): Promise<void> => {
    await coreManager.sendMagicLink(username, confirmationURL);
  };
}
