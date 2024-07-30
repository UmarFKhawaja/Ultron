import { Session } from '@ultron/common-library';
import { injectable } from 'inversify';
import { JWTManager } from '../contracts';

@injectable()
export class AuthJWTManager implements JWTManager {
  sign(session: Session): string {
    throw new Error('Method not implemented.');
  }
}
