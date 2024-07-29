import { Session } from '@ultron/common-library';
import { injectable } from 'inversify';
import { JWTService } from '../contracts';

@injectable()
export class AuthJWTService implements JWTService {
  sign(session: Session): string {
    throw new Error('Method not implemented.');
  }
}
