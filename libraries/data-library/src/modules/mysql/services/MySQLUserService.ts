import { Account, ProviderType, User, UserService } from '@ultron/core-library';
import { hashSync } from 'bcryptjs';
import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { MYSQL_CONSTANTS } from '../constants';
import { RepositoriesProvider } from '../types';

@injectable()
export class MySQLUserService implements UserService {
  constructor(
    @inject(MYSQL_CONSTANTS.Symbols.Providers.RepositoriesProvider)
    private readonly provideRepositories: RepositoriesProvider
  ) {
  }

  async createUser(displayName: string, userName: string, emailAddress: string, password: string): Promise<User> {
    const {
      userRepository
    } = await this.provideRepositories();

    let user: User = userRepository.create({
      displayName,
      userName,
      emailAddress,
      ...(password ? {
        saltHash: hashSync(password)
      } : {})
    });

    user = await userRepository.save(user);

    return user;
  }

  async updateUser(userID: string, displayName: string, userName: string, emailAddress: string): Promise<User> {
    const {
      userRepository
    } = await this.provideRepositories();

    await userRepository.update({
      id: userID
    }, {
      displayName,
      userName,
      emailAddress
    });

    const user: User | null = await userRepository
      .findOne({
        where: {
          id: userID
        }
      });

    if (!user) {
      throw new Error('a user with the specified ID could not be found');
    }

    return user;
  }

  async verifyUser(userID: string): Promise<User> {
    const {
      userRepository
    } = await this.provideRepositories();

    await userRepository
      .update({
        id: userID
      }, {
        verifiedAt: dayjs().toDate()
      });

    const user: User | null = await userRepository
      .findOne({
        where: {
          id: userID
        }
      });

    if (!user) {
      throw new Error('a user with the specified ID could not be found');
    }

    return user;
  }

  async linkUserToProvider(userID: string, providerType: ProviderType, providerID: string): Promise<User> {
    const {
      userRepository,
      accountRepository
    } = await this.provideRepositories();

    let user: User | null = await userRepository
      .findOne({
        where: {
          id: userID
        },
        relations: {
          accounts: true
        }
      });

    if (!user) {
      throw new Error('a user with the specified ID could not be found');
    }

    const index: number = user.accounts.findIndex((account: Account): boolean => account.providerType === providerType && account.providerID === providerID);

    if (index > -1) {
      return user;
    }

    let account: Account = accountRepository.create({
      providerType,
      providerID
    });

    user.accounts.push(account);

    account = await accountRepository.save(account);

    user = await userRepository.save(user);

    return user;
  }

  async unlinkUserFromProvider(userID: string, providerType: ProviderType): Promise<User> {
    const {
      userRepository,
      accountRepository
    } = await this.provideRepositories();

    let user: User | null = await userRepository
      .findOne({
        where: {
          id: userID
        },
        relations: {
          accounts: true
        }
      });

    if (!user) {
      throw new Error('a user with the specified ID could not be found');
    }

    const index: number = user.accounts.findIndex((account: Account): boolean => account.providerType === providerType);

    if (index === -1) {
      return user;
    }

    const account: Account = user.accounts[index];

    await accountRepository.remove(account);

    user = await this.getUserByID(user.id);

    return user;
  }

  async setPassword(userID: string, saltHash: string): Promise<User> {
    const {
      userRepository
    } = await this.provideRepositories();

    await userRepository.update({
      id: userID
    }, {
      saltHash
    });

    const user: User | null = await userRepository
      .findOne({
        where: {
          id: userID
        }
      });

    if (!user) {
      throw new Error('a user with the specified ID could not be found');
    }

    return user;
  }

  async unsetPassword(userID: string): Promise<User> {
    const {
      userRepository
    } = await this.provideRepositories();

    await userRepository.update({
      id: userID
    }, {
      saltHash: ''
    });

    const user: User | null = await userRepository
      .findOne({
        where: {
          id: userID
        }
      });

    if (!user) {
      throw new Error('a user with the specified ID could not be found');
    }

    return user;
  }

  async getUserByID(id: string): Promise<User> {
    const {
      userRepository
    } = await this.provideRepositories();

    const user: User | null = await userRepository
      .findOne({
        where: {
          id
        },
        relations: {
          accounts: true
        }
      });

    if (!user) {
      throw new Error('a user with the specified ID could not be found');
    }

    return user;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const {
      userRepository
    } = await this.provideRepositories();

    const user: User | null = await userRepository
      .findOne({
        where: [
          {
            userName: username
          },
          {
            emailAddress: username
          }
        ]
      });

    return user;
  }

  async findUserByProvider(providerType: ProviderType, providerID: string): Promise<User | null> {
    const account: Account | null = await this.getAccountByProvider(providerType, providerID);

    if (!account) {
      return null;
    }

    const user: User | null = await this.getUserByID(account.user.id);

    return user;
  }

  async getAccountByProvider(providerType: ProviderType, providerID: string): Promise<Account | null> {
    const {
      accountRepository
    } = await this.provideRepositories();

    const account: Account | null = await accountRepository
      .findOne({
        where: {
          providerType,
          providerID
        }
      });

    if (!account) {
      return null;
    }

    return account;
  }
}
