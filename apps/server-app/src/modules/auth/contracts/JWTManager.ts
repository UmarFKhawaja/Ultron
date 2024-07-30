import { Session } from '@ultron/common-library';

export interface JWTManager {
  sign(session: Session): string;
}
