import { DefineModuleFunction, MailSender, TaskHandler } from '@ultron/core-library';
import { Container } from 'inversify';
import { APP_CONSTANTS } from './constants';
import { SimpleMailSender, SimpleTaskHandler } from './services';

export const defineAppModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<MailSender>(APP_CONSTANTS.Symbols.Services.MailSender).to(SimpleMailSender).inRequestScope();
  container.bind<TaskHandler>(APP_CONSTANTS.Symbols.Services.TaskHandler).to(SimpleTaskHandler).inRequestScope();

  return container;
};
