import { Account, ProviderType } from '../models';

export interface AccountHelper {
  createAccount(providerType: ProviderType, providerID: string, userID: string): Promise<Account>;

  findAccount(providerType: ProviderType, userID: string): Promise<Account | null>;
}
