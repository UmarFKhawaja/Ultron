import { Mail } from '../types';

export interface MailTransporter {
  transportMail(mail: Mail): Promise<boolean>;
}
