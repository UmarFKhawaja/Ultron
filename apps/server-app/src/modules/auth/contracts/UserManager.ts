import { ProviderType, User } from '@ultron/core-library';

export interface UserManager {
  registerUser(displayName: string, userName: string, emailAddress: string, password: string): Promise<User>;

  ensureUserWithProvider(displayName: string, userName: string, emailAddress: string, providerType: ProviderType, providerID: string): Promise<User>;

  ensureUserNotWithProvider(user: User, providerType: ProviderType): Promise<User>;

  updateUser(user: User, displayName: string, userName: string): Promise<User>;

  verifyUser(user: User): Promise<User>;

  resetPassword(user: User): Promise<User>;

  changeEmailAddress(user: User, emailAddress: string): Promise<User>;

  changePassword(user: User, oldPassword: string, newPassword: string): Promise<User>;

  setPassword(user: User, newPassword: string): Promise<User>;

  unsetPassword(user: User, oldPassword: string): Promise<User>;

  getUserByID(id: string): Promise<User>;

  findUserByUsername(username: string): Promise<User | null>;
}
