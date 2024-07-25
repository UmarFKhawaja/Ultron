import { createTransport, Transporter as Connection } from 'nodemailer';
import { NODEMAILER_CONSTANTS } from '../constants';
import { ConnectionProvider } from '../types';

export function provideConnection(): ConnectionProvider {
  return async (): Promise<Connection> => createTransport({
    host: NODEMAILER_CONSTANTS.Settings.host,
    port: NODEMAILER_CONSTANTS.Settings.port,
    secure: NODEMAILER_CONSTANTS.Settings.useTLS,
    auth: {
      user: NODEMAILER_CONSTANTS.Settings.auth.username,
      pass: NODEMAILER_CONSTANTS.Settings.auth.password
    }
  });
}
