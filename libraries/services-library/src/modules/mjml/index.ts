import { DefineModuleFunction } from '@ultron/core-library';
import { Container } from 'inversify';
import { MailFormatterService } from '../../contracts';
import { MJML_CONSTANTS } from './constants';
import { MJMLMailFormatterService } from './services';

export { MJML_CONSTANTS } from './constants';

export const defineMJMLModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<MailFormatterService>(MJML_CONSTANTS.Symbols.Services.MailFormatterService).to(MJMLMailFormatterService).inRequestScope();

  return container;
};
