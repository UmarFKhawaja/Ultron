import { Session } from '@ultron/common-library';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../constants';
import { TokenManager } from '../contracts';
import { extractSession } from './extractSession';

export function logout(container: Container) {
  const tokenManager: TokenManager = container.get<TokenManager>(AUTH_CONSTANTS.Symbols.Services.TokenManager);

  return async (req: Request, res: Response): Promise<void> => {
    try {
      const session: Session | null = extractSession(req);

      await tokenManager.invalidateToken(session);

      res.status(200).end();
    } catch (error: unknown) {
      res.status(500).end();
    }
  };
}
