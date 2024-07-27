import { Session } from '@ultron/common-library';
import { JWTService } from '@ultron/core-library';
import { injectable } from 'inversify';

@injectable()
export class AuthJWTService implements JWTService {
  sign(session: Session): string {
    throw new Error('Method not implemented.');
  }
}
