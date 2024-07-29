import { FAILURE, Result, Session, SUCCESS, Token } from '@ultron/common-library';
import { Account, ProviderType, SessionService, User } from '@ultron/core-library';
import { REDIS_CONSTANTS } from '@ultron/data-library';
import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { decode } from 'jsonwebtoken';
import { JwtPayload } from 'jwt-decode';
import { v4 as generateUUID } from 'uuid';
import { JWTService, TokenService } from '../contracts';

@injectable()
export class AuthTokenService implements TokenService {
  constructor(
    @inject(Symbol.for('JWTService'))
    private jwtService: JWTService,
    @inject(REDIS_CONSTANTS.Symbols.Services.SessionService)
    private sessionService: SessionService
  ) {
  }

  async validateSession(session: Session): Promise<boolean> {
    const isKnown: boolean = await this.sessionService.hasSessionExpiry(session.id);

    if (!isKnown) {
      return false;
    }

    const expiresAt: Date = await this.sessionService.getSessionExpiry(session.id);

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

    const encodedToken: string = this.jwtService.sign(session);
    const decodedToken: JwtPayload = decode(encodedToken) as JwtPayload;
    const timestamp: number = (decodedToken.exp || 0) * 1000;

    await this.sessionService.setSessionExpiry(session.id, dayjs(timestamp).toDate());

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
      await this.sessionService.unsetSessionExpiry(session.id);
    }
  }
}
