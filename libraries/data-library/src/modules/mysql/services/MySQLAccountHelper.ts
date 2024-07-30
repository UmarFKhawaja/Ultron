import { Account, AccountHelper, ProviderType, User } from '@ultron/core-library';
import { inject, injectable } from 'inversify';
import { MYSQL_CONSTANTS } from '../constants';
import { RepositoriesProvider } from '../types';

@injectable()
export class MySQLAccountHelper implements AccountHelper {
  constructor(
    @inject(MYSQL_CONSTANTS.Symbols.Providers.RepositoriesProvider)
    private readonly provideRepositories: RepositoriesProvider
  ) {
  }

  async createAccount(providerType: ProviderType, providerID: string, userID: string): Promise<Account> {
    const {
      userRepository,
      accountRepository
    } = await this.provideRepositories();

    let user: User | null = await userRepository.findOne({
      where: {
        id: userID
      },
      relations: {
        accounts: true
      }
    });

    if (!user) {
      throw new Error('a user could not be found');
    }

    const index: number = user.accounts.findIndex((account: Account): boolean => account.providerType === providerType && account.providerID === providerID);

    if (index > -1) {
      return user.accounts[index];
    }

    let account: Account = accountRepository.create({
      providerType,
      providerID
    });

    user.accounts.push(account);
    account.user = user;

    user = await userRepository.save(user);

    account = await accountRepository.save(account);

    return account;
  }

  async findAccount(providerType: ProviderType, userID: string): Promise<Account | null> {
    const {
      accountRepository
    } = await this.provideRepositories();

    const account: Account | null = await accountRepository
      .findOne({
        where: {
          providerType,
          user: {
            id: userID
          }
        },
        relations: {
          user: true
        }
      });

    return account;
  }
}
