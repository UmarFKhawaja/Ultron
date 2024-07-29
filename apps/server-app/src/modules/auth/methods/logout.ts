import { Session } from '@ultron/common-library';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../constants';
import { TokenService } from '../contracts';
import { extractSession } from './extractSession';

export function logout(container: Container) {
  const tokenService: TokenService = container.get<TokenService>(AUTH_CONSTANTS.Symbols.Services.TokenService);

  return async (req: Request, res: Response): Promise<void> => {
    try {
      const session: Session | null = extractSession(req);

      await tokenService.invalidateToken(session);

      res.status(200).end();
    } catch (error: unknown) {
      res.status(500).end();
    }
  };
}
