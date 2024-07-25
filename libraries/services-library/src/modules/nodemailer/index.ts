import { DefineModuleFunction } from '@ultron/core-library';
import { Container } from 'inversify';
import { MailSenderService } from '../../contracts';
import { NODEMAILER_CONSTANTS } from './constants';
import { provideConnection } from './methods';
import { NodemailerMailSenderService } from './services';
import { ConnectionProvider } from './types';

export { NODEMAILER_CONSTANTS } from './constants';

export const defineNodemailerModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<ConnectionProvider>(NODEMAILER_CONSTANTS.Symbols.Providers.ConnectionProvider).toProvider(provideConnection);

  container.bind<MailSenderService>(NODEMAILER_CONSTANTS.Symbols.Services.MailSenderService).to(NodemailerMailSenderService).inRequestScope();

  return container;
};
