import { FAILURE, Session, Token } from '@ultron/common-library';
import { ProviderType, User } from '@ultron/core-library';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import { extractSession } from '../../../methods';

export function disconnectGoogle(container: Container) {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const session: Session | null = extractSession(req);

      let user: User = req.user as User;

      user = await this.coreManager.ensureUserNotWithProvider(user, ProviderType.GOOGLE);

      res.status(200).send(await this.tokenManager.regenerateToken(session, user));
    } catch (error: unknown) {
      res.status(500).send(FAILURE<Token>(error as Error));
    }
  };
}
