import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../../../constants';
import { AuthCoreService } from '../../../services';
import { SendMagicLinkFunction } from '../types';

export function sendMagicLink(container: Container): SendMagicLinkFunction {
  const coreService: AuthCoreService = container.get<AuthCoreService>(AUTH_CONSTANTS.Symbols.Services.CoreService);

  return async (username: string, confirmationURL: string): Promise<void> => {
    await coreService.sendMagicLink(username, confirmationURL);
  };
}
