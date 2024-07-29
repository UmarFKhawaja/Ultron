import { ProviderType, User } from '@ultron/core-library';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import { extractSession } from '../../../methods';
import { FAILURE, Session, Token } from '@ultron/common-library';

export function disconnectFacebook(container: Container) {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const session: Session | null = extractSession(req);

      let user: User = req.user as User;

      user = await this.coreService.ensureUserNotWithProvider(user, ProviderType.FACEBOOK);

      res.status(200).send(await this.tokenService.regenerateToken(session, user));
    } catch (error: unknown) {
      res.status(500).send(FAILURE<Token>(error as Error));
    }
  };
}
