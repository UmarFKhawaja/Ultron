import { FAILURE, Result, Session, SUCCESS, Token } from '@ultron/common-library';
import { Account, ProviderType, SessionManager, User } from '@ultron/core-library';
import { REDIS_CONSTANTS } from '@ultron/data-library';
import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { decode } from 'jsonwebtoken';
import { JwtPayload } from 'jwt-decode';
import { v4 as generateUUID } from 'uuid';
import { AUTH_CONSTANTS } from '../constants';
import { JWTManager, TokenManager } from '../contracts';

@injectable()
export class AuthTokenManager implements TokenManager {
  constructor(
    @inject(AUTH_CONSTANTS.Symbols.Services.JWTManager)
    private jwtManager: JWTManager,
    @inject(REDIS_CONSTANTS.Symbols.Services.SessionManager)
    private sessionManager: SessionManager
  ) {
  }

  async validateSession(session: Session): Promise<boolean> {
    const isKnown: boolean = await this.sessionManager.hasSessionExpiry(session.id);

    if (!isKnown) {
      return false;
    }

    const expiresAt: Date = await this.sessionManager.getSessionExpiry(session.id);

    return dayjs().isBefore(dayjs(expiresAt));
  }

  async createToken(user: User): Promise<string> {
    const session: Session = {
      id: generateUUID(),
      sub: user.id,
      displayName: user.displayName,
      userName: user.userName,
      emailAddress: user.emailAddress,
      accounts: {
        local: !!user.saltHash,
        social: {
          facebook: user.accounts
            .map((account) => account as unknown as Account)
            .some((account: Account): boolean => account.providerType === ProviderType.FACEBOOK),
          google: user.accounts
            .map((account) => account as unknown as Account)
            .some((account: Account): boolean => account.providerType === ProviderType.GOOGLE)
        }
      }
    };

    const encodedToken: string = this.jwtManager.sign(session);
    const decodedToken: JwtPayload = decode(encodedToken) as JwtPayload;
    const timestamp: number = (decodedToken.exp || 0) * 1000;

    await this.sessionManager.setSessionExpiry(session.id, dayjs(timestamp).toDate());

    return encodedToken;
  }

  async generateToken(user: User | null): Promise<Result<Token>> {
    if (!user) {
      return FAILURE<Token>('a user must be provided to generate a token');
    }

    const token: string = await this.createToken(user);

    return SUCCESS<Token>({
      token
    });
  }

  async regenerateToken(session: Session | null, user: User): Promise<Result<Token>> {
    await this.invalidateToken(session);

    return await this.generateToken(user);
  }

  async invalidateToken(session: Session | null): Promise<void> {
    if (session) {
      await this.sessionManager.unsetSessionExpiry(session.id);
    }
  }
}
