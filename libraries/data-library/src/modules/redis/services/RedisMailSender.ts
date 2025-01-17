import { MailSender, serializeJSON } from '@ultron/core-library';
import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { Redis as Connection } from 'ioredis';
import { REDIS_CONSTANTS } from '../constants';
import { ConnectionProvider } from '../types';

@injectable()
export class RedisMailSender implements MailSender {
  constructor(
    @inject(REDIS_CONSTANTS.Symbols.Providers.ConnectionProvider)
    private readonly provideConnection: ConnectionProvider
  ) {
  }

  async sendRegisterMail(emailAddress: string, verificationURL: string): Promise<boolean> {
    return await this.publishMessage({
      type: 'SEND_REGISTER_MAIL',
      emailAddress,
      verificationURL
    });
  }

  async sendLoginWithMagicLoginMail(emailAddress: string, confirmationURL: string): Promise<boolean> {
    return await this.publishMessage({
      type: 'SEND_LOGIN_WITH_MAGIC_LOGIN_MAIL',
      emailAddress,
      confirmationURL
    });
  }

  async sendResetPasswordMail(emailAddress: string, confirmationURL: string): Promise<boolean> {
    return await this.publishMessage({
      type: 'SEND_RESET_PASSWORD_MAIL',
      emailAddress,
      confirmationURL
    });
  }

  async sendConfirmEmailAddressChangeMail(oldEmailAddress: string, newEmailAddress: string, confirmationURL: string): Promise<boolean> {
    return await this.publishMessage({
      type: 'SEND_CONFIRM_EMAIL_ADDRESS_CHANGE_MAIL',
      oldEmailAddress,
      newEmailAddress,
      confirmationURL
    });
  }

  async sendCompleteEmailAddressChangeMail(oldEmailAddress: string, newEmailAddress: string, confirmationURL: string): Promise<boolean> {
    return await this.publishMessage({
      type: 'SEND_COMPLETE_EMAIL_ADDRESS_CHANGE_MAIL',
      oldEmailAddress,
      newEmailAddress,
      confirmationURL
    });
  }

  private async publishMessage<T>(message: T): Promise<boolean> {
    const executedAt: Date = dayjs().toDate();

    const connection: Connection = await this.provideConnection();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await connection.publish(REDIS_CONSTANTS.Names.Notifications, serializeJSON<T & {
      createdAt: Date;
      updatedAt: Date;
    }>({
      ...message,
      createdAt: executedAt,
      updatedAt: executedAt
    }));

    return true;
  }
}
