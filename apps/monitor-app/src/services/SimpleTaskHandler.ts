import { MailSender, Task, TaskHandler } from '@ultron/core-library';
import { inject, injectable } from 'inversify';
import { APP_CONSTANTS } from '../constants';

@injectable()
export class SimpleTaskHandler implements TaskHandler {
  constructor(
    @inject(APP_CONSTANTS.Symbols.Services.MailSender)
    private readonly mailSender: MailSender
  ) {
  }

  async handleTask(task: Task): Promise<void> {
    switch (task.type) {
      case 'SEND_REGISTER_MAIL':
        await this.mailSender.sendRegisterMail(task.emailAddress, task.verificationURL);
        break;

      case 'SEND_LOGIN_WITH_MAGIC_LOGIN_MAIL':
        await this.mailSender.sendLoginWithMagicLoginMail(task.emailAddress, task.confirmationURL);
        break;

      case 'SEND_RESET_PASSWORD_MAIL':
        await this.mailSender.sendResetPasswordMail(task.emailAddress, task.confirmationURL);
        break;

      case 'SEND_CONFIRM_EMAIL_ADDRESS_CHANGE_MAIL':
        await this.mailSender.sendConfirmEmailAddressChangeMail(task.oldEmailAddress, task.newEmailAddress, task.confirmationURL);
        break;

      case 'SEND_COMPLETE_EMAIL_ADDRESS_CHANGE_MAIL':
        await this.mailSender.sendCompleteEmailAddressChangeMail(task.oldEmailAddress, task.newEmailAddress, task.confirmationURL);
        break;

      default:
        // TODO : wrap this in a Logger class instance
        console.warn(task);
        break;
    }
  }
}
