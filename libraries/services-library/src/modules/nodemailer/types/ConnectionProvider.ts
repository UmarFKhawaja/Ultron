import { Transporter as Connection } from 'nodemailer';

export type ConnectionProvider = () => Promise<Connection>;
