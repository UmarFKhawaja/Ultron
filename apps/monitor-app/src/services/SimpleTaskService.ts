import { MailService, Task, TaskService } from '@ultron/core-library';
import { inject, injectable } from 'inversify';
import { APP_CONSTANTS } from '../constants';

@injectable()
export class SimpleTaskService implements TaskService {
  constructor(
    @inject(APP_CONSTANTS.Symbols.Services.MailService)
    private readonly mailService: MailService
  ) {
  }

  async handleTask(task: Task): Promise<void> {
    switch (task.type) {
      case 'SEND_REGISTER_MAIL':
        await this.mailService.sendRegisterMail(task.emailAddress, task.verificationURL);
        break;

      case 'SEND_LOGIN_WITH_MAGIC_LOGIN_MAIL':
        await this.mailService.sendLoginWithMagicLoginMail(task.emailAddress, task.confirmationURL);
        break;

      case 'SEND_RESET_PASSWORD_MAIL':
        await this.mailService.sendResetPasswordMail(task.emailAddress, task.confirmationURL);
        break;

      case 'SEND_CONFIRM_EMAIL_ADDRESS_CHANGE_MAIL':
        await this.mailService.sendConfirmEmailAddressChange(task.oldEmailAddress, task.newEmailAddress, task.confirmationURL);
        break;

      case 'SEND_COMPLETE_EMAIL_ADDRESS_CHANGE_MAIL':
        await this.mailService.sendCompleteEmailAddressChange(task.oldEmailAddress, task.newEmailAddress, task.confirmationURL);
        break;

      default:
        // TODO : wrap this in a Logger class instance
        console.warn(task);
        break;
    }
  }
}
