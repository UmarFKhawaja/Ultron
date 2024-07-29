import { FAILURE, Session, Token } from '@ultron/common-library';
import { User } from '@ultron/core-library';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreService, TokenService } from '../../../contracts';
import { extractSession } from '../../../methods';

export function changePassword(container: Container) {
  const coreService: CoreService = container.get<CoreService>(AUTH_CONSTANTS.Symbols.Services.CoreService);
  const tokenService: TokenService = container.get<TokenService>(AUTH_CONSTANTS.Symbols.Services.TokenService);

  return async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        oldPassword,
        newPassword
      }: {
        oldPassword: string;
        newPassword: string;
      } = req.body;

      const session: Session | null = extractSession(req);

      let user: User | null = req.user as User;

      user = await coreService.changePassword(user, oldPassword, newPassword);

      res.status(200).send(await tokenService.regenerateToken(session, user));
    } catch (error: unknown) {
      res.status(500).send(FAILURE<Token>(error as Error));
    }
  };
}
