import { Session } from '@ultron/common-library';

export interface JWTService {
  sign(session: Session): string;
}
