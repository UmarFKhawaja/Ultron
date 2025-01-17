import { ProviderType, User } from '../models';

export interface UserHelper {
  createUser(displayName: string, userName: string, emailAddress: string, password: string): Promise<User>;

  updateUser(userID: string, displayName: string, userName: string, emailAddress: string): Promise<User>;

  verifyUser(userID: string): Promise<User>;

  linkUserToProvider(userID: string, providerType: ProviderType, providerID: string): Promise<User>;

  unlinkUserFromProvider(userID: string, providerType: ProviderType): Promise<User>;

  setPassword(userID: string, saltHash: string): Promise<User>;

  unsetPassword(userID: string): Promise<User>;

  getUserByID(id: string): Promise<User>;

  findUserByUsername(username: string): Promise<User | null>;

  findUserByProvider(providerType: ProviderType, providerID: string): Promise<User | null>;
}
