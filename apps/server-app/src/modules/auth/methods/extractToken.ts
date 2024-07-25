import { Request } from 'express';

export function extractToken(req: Request): string {
  const token: string = req.headers.authorization?.replace(/^Bearer /, '') ?? '';

  return token;
}
