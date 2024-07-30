import { Result, Session, Token } from '@ultron/common-library';
import { User } from '@ultron/core-library';

export interface TokenManager {
  validateSession(session: Session): Promise<boolean>;

  createToken(user: User): Promise<string>;

  generateToken(user: User | null): Promise<Result<Token>>;

  regenerateToken(session: Session | null, user: User): Promise<Result<Token>>;

  invalidateToken(session: Session | null): Promise<void>;
}
