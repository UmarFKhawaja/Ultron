import { Request } from 'express';

export type SendMagicLinkFunction = (destination: string, href: string, verificationCode: string, req: Request) => Promise<void>;

export type VerifyFunction = (payload: any, verifyCallback: (err?: Error | null, user?: object, info?: any) => void, req: Request) => void;
