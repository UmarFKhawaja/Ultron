import { FAILURE, Session, Token } from '@ultron/common-library';
import { User } from '@ultron/core-library';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../../../constants';
import { TokenManager } from '../../../contracts';
import { extractSession } from '../../../methods';

export function loginWithPassword(container: Container) {
  const tokenManager: TokenManager = container.get<TokenManager>(AUTH_CONSTANTS.Symbols.Services.TokenManager);

  return async (req: Request, res: Response): Promise<void> => {
    try {
      const session: Session | null = extractSession(req);

      const user: User = req.user as User;

      res.status(200).send(await tokenManager.regenerateToken(session, user));
    } catch (error: unknown) {
      res.status(500).send(FAILURE<Token>(error as Error));
    }
  };
}
