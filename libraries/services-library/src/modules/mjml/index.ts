import { DefineModuleFunction } from '@ultron/core-library';
import { Container } from 'inversify';
import { MailFormatter } from '../../contracts';
import { MJML_CONSTANTS } from './constants';
import { MJMLMailFormatter } from './services';

export { MJML_CONSTANTS } from './constants';

export const defineMJMLModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<MailFormatter>(MJML_CONSTANTS.Symbols.Services.MailFormatter).to(MJMLMailFormatter).inRequestScope();

  return container;
};
