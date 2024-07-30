import { EmailAddressChanged, Information } from '@ultron/common-library';
import { ProviderType, User, VerificationRequest } from '@ultron/core-library';

export interface CoreManager {
  register(displayName: string, userName: string, emailAddress: string, password: string): Promise<void>;

  requestActivationCode(username: string): Promise<void>;

  activateAccount(activationCode: string): Promise<User>;

  recoverAccount(username: string): Promise<void>;

  getUserByID(id: string): Promise<User>;

  getUserByUsername(username: string): Promise<User>;

  getInformation(user: User): Promise<Information>;

  updateProfile(user: User, displayName: string, userName: string): Promise<User>;

  startEmailAddressChange(user: User, emailAddress: string): Promise<Information>;

  confirmEmailAddressChange(user: User, confirmationCode: string): Promise<Information>;

  completeEmailAddressChange(user: User, confirmationCode: string): Promise<User>;

  cancelEmailAddressChange(user: User, confirmationCode: string): Promise<Information>;

  resendEmailAddressChange(user: User): Promise<Information>;

  validateUser(user: User): Promise<boolean>;

  checkPassword(user: User, password: string): Promise<boolean>;

  resetPassword(user: User): Promise<User>;

  changePassword(user: User, oldPassword: string, newPassword: string): Promise<User>;

  setPassword(user: User, newPassword: string): Promise<User>;

  unsetPassword(user: User, oldPassword: string): Promise<User>;

  ensureUserWithProvider(displayName: string, userName: string, emailAddress: string, providerType: ProviderType, providerID: string): Promise<User>;

  ensureUserNotWithProvider(user: User, providerType: ProviderType): Promise<User>;

  checkUsername(username: string): Promise<User>;

  checkUserByUsernameAndPassword(username: string, password: string): Promise<User>;

  checkUserByUsername(username: string): Promise<User>;

  checkUserByID(id: string): Promise<User>;

  sendMagicLink(username: string, confirmationURL: string): Promise<void>;

  createEmailAddressChanged(verificationRequest: VerificationRequest | null): EmailAddressChanged | null;
}
