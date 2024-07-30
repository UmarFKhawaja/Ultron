import { FAILURE, Session, Token } from '@ultron/common-library';
import { User } from '@ultron/core-library';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreManager, TokenManager } from '../../../contracts';
import { extractSession } from '../../../methods';

export function setPassword(container: Container) {
  const coreManager: CoreManager = container.get<CoreManager>(AUTH_CONSTANTS.Symbols.Services.CoreManager);
  const tokenManager: TokenManager = container.get<TokenManager>(AUTH_CONSTANTS.Symbols.Services.TokenManager);

  return async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        newPassword
      }: {
        newPassword: string;
      } = req.body;

      const session: Session | null = extractSession(req);

      let user: User | null = req.user as User;

      user = await coreManager.setPassword(user, newPassword);

      res.status(200).send(await tokenManager.regenerateToken(session, user));
    } catch (error: unknown) {
      res.status(500).send(FAILURE<Token>(error as Error));
    }
  };
}
