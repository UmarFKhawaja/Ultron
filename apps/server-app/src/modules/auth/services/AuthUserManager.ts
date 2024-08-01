import { ProviderType, User, UserHelper } from '@ultron/core-library';
import { MYSQL_CONSTANTS } from '@ultron/data-library';
import { compareSync, hashSync } from 'bcryptjs';
import { inject, injectable } from 'inversify';
import { UserManager } from '../contracts';

@injectable()
export class AuthUserManager implements UserManager {
  constructor(
    @inject(MYSQL_CONSTANTS.Symbols.Services.UserHelper)
    private readonly userHelper: UserHelper
  ) {
  }

  async registerUser(displayName: string, userName: string, emailAddress: string, password: string): Promise<User> {
    let user: User | null = null;

    if (!user) {
      user = await this.userHelper.findUserByUsername(emailAddress);

      if (user) {
        throw new Error('a user with that email address is already registered');
      }
    }

    if (!user) {
      user = await this.userHelper.findUserByUsername(userName);

      if (user) {
        throw new Error('a user with that user name is already registered');
      }
    }

    user = await this.userHelper.createUser(displayName, userName, emailAddress, password);

    return user;
  }

  async ensureUserWithProvider(displayName: string, userName: string, emailAddress: string, providerType: ProviderType, providerID: string): Promise<User> {
    let user: User | null = await this.userHelper.findUserByProvider(providerType, providerID);

    if (user) {
      return user;
    }

    if (!emailAddress) {
      throw new Error('an OAuth user must have an email address');
    }

    user = await this.userHelper.findUserByUsername(emailAddress);

    if (!user) {
      user = await this.userHelper.createUser(displayName, userName, emailAddress, '');

      user = await this.userHelper.verifyUser(user.id);
    }

    user = await this.userHelper.linkUserToProvider(user.id, providerType, providerID);

    return user;
  }

  async ensureUserNotWithProvider(user: User, providerType: ProviderType): Promise<User> {
    user = await this.userHelper.unlinkUserFromProvider(user.id, providerType);

    return user;
  }

  async updateUser(user: User, displayName: string, userName: string): Promise<User> {
    user = await this.userHelper.updateUser(user.id, displayName, userName, user.emailAddress);

    user = await this.userHelper.getUserByID(user.id);

    return user;
  }

  async verifyUser(user: User): Promise<User> {
    user = await this.userHelper.verifyUser(user.id);

    user = await this.userHelper.getUserByID(user.id);

    return user;
  }

  async resetPassword(user: User): Promise<User> {
    user = await this.userHelper.unsetPassword(user.id);

    user = await this.userHelper.getUserByID(user.id);

    return user;
  }

  async changeEmailAddress(user: User, emailAddress: string): Promise<User> {
    user = await this.userHelper.updateUser(user.id, user.displayName, user.userName, emailAddress);

    return user;
  }

  async changePassword(user: User, oldPassword: string, newPassword: string): Promise<User> {
    if (!compareSync(oldPassword, user.saltHash)) {
      throw new Error('the old password is incorrect');
    }

    user = await this.userHelper.setPassword(user.id, hashSync(newPassword));

    user = await this.userHelper.getUserByID(user.id);

    return user;
  }

  async setPassword(user: User, newPassword: string): Promise<User> {
    if (user.saltHash) {
      throw new Error('the old password hasn\'t been provided');
    }

    user = await this.userHelper.setPassword(user.id, hashSync(newPassword));

    user = await this.userHelper.getUserByID(user.id);

    return user;
  }

  async unsetPassword(user: User, oldPassword: string): Promise<User> {
    if (!compareSync(oldPassword, user.saltHash)) {
      throw new Error('the old password is incorrect');
    }

    user = await this.userHelper.unsetPassword(user.id);

    user = await this.userHelper.getUserByID(user.id);

    return user;
  }

  async getUserByID(id: string): Promise<User> {
    const user: User = await this.userHelper.getUserByID(id);

    return user;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user: User | null = await this.userHelper.findUserByUsername(username);

    return user;
  }
}
