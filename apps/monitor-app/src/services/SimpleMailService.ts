import { MailService } from '@ultron/core-library';
import {
  Mail,
  MailFormatterService,
  MailSenderService,
  MJML_CONSTANTS,
  NODEMAILER_CONSTANTS
} from '@ultron/services-library';
import { inject, injectable } from 'inversify';

@injectable()
export class SimpleMailService implements MailService {
  constructor(
    @inject(MJML_CONSTANTS.Symbols.Services.MailFormatterService)
    private readonly mailFormatterService: MailFormatterService,
    @inject(NODEMAILER_CONSTANTS.Symbols.Services.MailSenderService)
    private readonly mailSenderService: MailSenderService
  ) {
  }

  async sendRegisterMail(emailAddress: string, verificationURL: string): Promise<boolean> {
    const mail: Mail = await this.mailFormatterService.formatRegisterMail(emailAddress, verificationURL);

    return await this.mailSenderService.sendMail(mail);
  }

  async sendLoginWithMagicLoginMail(emailAddress: string, confirmationURL: string): Promise<boolean> {
    const mail: Mail = await this.mailFormatterService.formatLoginWithMagicLoginMail(emailAddress, confirmationURL);

    return await this.mailSenderService.sendMail(mail);
  }

  async sendResetPasswordMail(emailAddress: string, confirmationURL: string): Promise<boolean> {
    const mail: Mail = await this.mailFormatterService.formatResetPasswordMail(emailAddress, confirmationURL);

    return await this.mailSenderService.sendMail(mail);
  }

  async sendConfirmEmailAddressChange(oldEmailAddress: string, newEmailAddress: string, confirmationURL: string): Promise<boolean> {
    const mail: Mail = await this.mailFormatterService.formatConfirmEmailAddressChange(oldEmailAddress, newEmailAddress, confirmationURL);

    return await this.mailSenderService.sendMail(mail);
  }

  async sendCompleteEmailAddressChange(oldEmailAddress: string, newEmailAddress: string, confirmationURL: string): Promise<boolean> {
    const mail: Mail = await this.mailFormatterService.formatCompleteEmailAddressChange(oldEmailAddress, newEmailAddress, confirmationURL);

    return await this.mailSenderService.sendMail(mail);
  }
}
