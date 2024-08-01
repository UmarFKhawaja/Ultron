import { Request } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VerifyFunction = (payload: any, verifyCallback: (err?: Error | null, user?: object, info?: any) => void, req: Request) => void;
