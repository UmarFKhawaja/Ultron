import { Request } from 'express';

export type SendMagicLinkFunction = (destination: string, href: string, verificationCode: string, req: Request) => Promise<void>;
