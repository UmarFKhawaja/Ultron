import { User, VerificationRequest, VerificationRequestPurpose, VerificationRequestStatus } from '@ultron/core-library';

export interface VerificationRequestManager {
  recreateVerificationRequest(user: User, purpose: VerificationRequestPurpose): Promise<VerificationRequest | null>;

  createRegisterVerificationRequest(user: User): Promise<VerificationRequest>;

  createChangeEmailVerificationRequest(user: User, emailAddress: string, status: 'OLD_EMAIL_ADDRESS_NOT_CONFIRMED' | 'NEW_EMAIL_ADDRESS_NOT_CONFIRMED'): Promise<VerificationRequest>;

  completeVerificationRequest(user: User, code: string): Promise<VerificationRequest>;

  cancelVerificationRequest(user: User, code: string): Promise<VerificationRequest>;

  expireVerificationRequest(user: User, code: string): Promise<VerificationRequest>;

  findVerificationRequestByCode(code: string): Promise<VerificationRequest | null>;

  findVerificationRequestByUserAndPurpose(user: User, purpose: VerificationRequestPurpose): Promise<VerificationRequest | null>;

  updateVerificationRequest(user: User, code: string, status: VerificationRequestStatus): Promise<VerificationRequest>;

  getUserForVerificationRequest(code: string): Promise<User>;
}
