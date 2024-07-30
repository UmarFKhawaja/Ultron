import { inject, injectable } from 'inversify';
import { Transporter as Connection } from 'nodemailer';
import { MailTransporter } from '../../../contracts';
import { Mail } from '../../../types';
import { NODEMAILER_CONSTANTS } from '../constants';
import { ConnectionProvider } from '../types';

@injectable()
export class NodemailerMailTransporter implements MailTransporter {
  constructor(
    @inject(NODEMAILER_CONSTANTS.Symbols.Providers.ConnectionProvider)
    private readonly provideConnection: ConnectionProvider
  ) {
  }

  async transportMail(mail: Mail): Promise<boolean> {
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
