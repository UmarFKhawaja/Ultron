import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreService } from '../../../contracts';
import { SendMagicLinkFunction } from '../types';

export function sendMagicLink(container: Container): SendMagicLinkFunction {
  const coreService: CoreService = container.get<CoreService>(AUTH_CONSTANTS.Symbols.Services.CoreService);

  return async (username: string, confirmationURL: string): Promise<void> => {
    await coreService.sendMagicLink(username, confirmationURL);
  };
}
