import { DefineModuleFunction, MailService, TaskService } from '@ultron/core-library';
import { Container } from 'inversify';
import { APP_CONSTANTS } from './constants';
import { SimpleMailService, SimpleTaskService } from './services';

export const defineAppModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<MailService>(APP_CONSTANTS.Symbols.Services.MailService).to(SimpleMailService).inRequestScope();
  container.bind<TaskService>(APP_CONSTANTS.Symbols.Services.TaskService).to(SimpleTaskService).inRequestScope();

  return container;
};
