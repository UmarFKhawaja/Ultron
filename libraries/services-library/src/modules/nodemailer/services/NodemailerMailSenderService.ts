import { inject, injectable } from 'inversify';
import { Transporter as Connection } from 'nodemailer';
import { MailSenderService } from '../../../contracts';
import { Mail } from '../../../types';
import { NODEMAILER_CONSTANTS } from '../constants';
import { ConnectionProvider } from '../types';

@injectable()
export class NodemailerMailSenderService implements MailSenderService {
  constructor(
    @inject(NODEMAILER_CONSTANTS.Symbols.Providers.ConnectionProvider)
    private readonly provideConnection: ConnectionProvider
  ) {
  }

  async sendMail(mail: Mail): Promise<boolean> {
    const connection: Connection = await this.provideConnection();

    await connection.sendMail({
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      html: mail.content
    });

    return true;
  }
}
