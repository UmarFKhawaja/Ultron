import { MailSender } from '@ultron/core-library';
import {
  Mail,
  MailFormatter,
  MailTransporter,
  MJML_CONSTANTS,
  NODEMAILER_CONSTANTS
} from '@ultron/services-library';
import { inject, injectable } from 'inversify';

@injectable()
export class SimpleMailSender implements MailSender {
  constructor(
    @inject(MJML_CONSTANTS.Symbols.Services.MailFormatter)
    private readonly mailFormatterService: MailFormatter,
    @inject(NODEMAILER_CONSTANTS.Symbols.Services.MailTransporter)
    private readonly mailSenderService: MailTransporter
  ) {
  }

  async sendRegisterMail(emailAddress: string, verificationURL: string): Promise<boolean> {
    const mail: Mail = await this.mailFormatterService.formatRegisterMail(emailAddress, verificationURL);

    return await this.mailSenderService.transportMail(mail);
  }

  async sendLoginWithMagicLoginMail(emailAddress: string, confirmationURL: string): Promise<boolean> {
    const mail: Mail = await this.mailFormatterService.formatLoginWithMagicLoginMail(emailAddress, confirmationURL);

    return await this.mailSenderService.transportMail(mail);
  }

  async sendResetPasswordMail(emailAddress: string, confirmationURL: string): Promise<boolean> {
    const mail: Mail = await this.mailFormatterService.formatResetPasswordMail(emailAddress, confirmationURL);

    return await this.mailSenderService.transportMail(mail);
  }

  async sendConfirmEmailAddressChangeMail(oldEmailAddress: string, newEmailAddress: string, confirmationURL: string): Promise<boolean> {
    const mail: Mail = await this.mailFormatterService.formatConfirmEmailAddressChangeMail(oldEmailAddress, newEmailAddress, confirmationURL);

    return await this.mailSenderService.transportMail(mail);
  }

  async sendCompleteEmailAddressChangeMail(oldEmailAddress: string, newEmailAddress: string, confirmationURL: string): Promise<boolean> {
    const mail: Mail = await this.mailFormatterService.formatCompleteEmailAddressChangeMail(oldEmailAddress, newEmailAddress, confirmationURL);

    return await this.mailSenderService.transportMail(mail);
  }
}
