import { EmailAddressChanged, Information } from '@ultron/common-library';
import {
  AccessAction,
  AccessChecker,
  MailSender,
  ProviderType,
  User,
  VerificationRequest,
  VerificationRequestPurpose
} from '@ultron/core-library';
import { CERBOS_CONSTANTS, REDIS_CONSTANTS } from '@ultron/data-library';
import { compareSync } from 'bcryptjs';
import { inject, injectable } from 'inversify';
import { AUTH_CONSTANTS } from '../constants';
import { CoreManager, TokenManager, URLFormatter, UserManager, VerificationRequestManager } from '../contracts';

@injectable()
export class AuthCoreManager implements CoreManager {
  constructor(
    @inject(CERBOS_CONSTANTS.Symbols.Services.AccessChecker)
    private readonly accessChecker: AccessChecker,
    @inject(REDIS_CONSTANTS.Symbols.Services.MailSender)
    private readonly mailSender: MailSender,
    @inject(AUTH_CONSTANTS.Symbols.Services.TokenManager)
    private readonly tokenManager: TokenManager,
    @inject(AUTH_CONSTANTS.Symbols.Services.URLFormatter)
    private readonly urlFormatter: URLFormatter,
    @inject(AUTH_CONSTANTS.Symbols.Services.UserManager)
    private readonly userManager: UserManager,
    @inject(AUTH_CONSTANTS.Symbols.Services.VerificationRequestManager)
    private readonly verificationRequestManager: VerificationRequestManager
  ) {
  }

  async register(displayName: string, userName: string, emailAddress: string, password: string): Promise<void> {
    const user: User = await this.userManager.registerUser(displayName, userName, emailAddress, password);

    const verificationRequest: VerificationRequest = await this.verificationRequestManager.createRegisterVerificationRequest(user);

    const verificationURL: string = this.urlFormatter.formatRegisterVerificationURL(verificationRequest);

    await this.mailSender.sendRegisterMail(user.emailAddress, verificationURL);
  }

  async requestActivationCode(username: string): Promise<void> {
    const user: User | null = await this.userManager.findUserByUsername(username);

    if (!user) {
      throw new Error('a user with the specified username could not be found');
    }

    if (user.verifiedAt) {
      throw new Error('the user with the specified username is already activated');
    }

    const verificationRequest: VerificationRequest = await this.verificationRequestManager.createRegisterVerificationRequest(user);

    const verificationURL: string = this.urlFormatter.formatRegisterVerificationURL(verificationRequest);

    await this.mailSender.sendRegisterMail(user.emailAddress, verificationURL);
  }

  async activateAccount(activationCode: string): Promise<User> {
    let user: User | null = await this.verificationRequestManager.getUserForVerificationRequest(activationCode);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const verificationRequest: VerificationRequest = await this.verificationRequestManager.completeVerificationRequest(user, activationCode);

    user = await this.userManager.verifyUser(user);

    if (!user) {
      throw new Error('a user with the specified ID could not be found');
    }

    if (!user.verifiedAt) {
      throw new Error('the user with the specified user ID is not verified');
    }

    return user;
  }

  async recoverAccount(username: string): Promise<void> {
    const user: User | null = await this.userManager.findUserByUsername(username);

    if (!user) {
      return;
    }

    const token: string = await this.tokenManager.createToken(user);

    const confirmationURL: string = this.urlFormatter.formatRecoverAccountConfirmationURL(token);

    await this.mailSender.sendResetPasswordMail(user.emailAddress, confirmationURL);
  }

  async getUserByID(id: string): Promise<User> {
    const user: User = await this.userManager.getUserByID(id);

    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user: User | null = await this.userManager.findUserByUsername(username);

    if (!user) {
      throw new Error('a user with that username could not be found');
    }

    return user;
  }

  async getInformation(user: User): Promise<Information> {
    const verificationRequest: VerificationRequest | null = await this.verificationRequestManager
      .findVerificationRequestByUserAndPurpose(user, VerificationRequestPurpose.CHANGE_EMAIL_ADDRESS);

    if (verificationRequest) {
      const hasAccess: boolean = await this.accessChecker.checkVerificationRequestAccess(user, verificationRequest, AccessAction.SELECT);

      if (!hasAccess) {
        throw new Error('you do not have access to the information');
      }

      const information: Information = {
        emailAddressChanged: this.createEmailAddressChanged(verificationRequest)
      };

      return information;
    } else {
      const information: Information = {
        emailAddressChanged: null
      };

      return information;
    }
  }

  async updateProfile(user: User, displayName: string, userName: string): Promise<User> {
    const hasAccess: boolean = await this.accessChecker.checkUserAccess(user, user, AccessAction.UPDATE);

    if (!hasAccess) {
      throw new Error('you do not have access to the profile');
    }

    user = await this.userManager.updateUser(user, displayName, userName);

    return user;
  }

  async startEmailAddressChange(user: User, emailAddress: string): Promise<Information> {
    const hasAccess: boolean = await this.accessChecker.checkUserAccess(user, user, AccessAction.UPDATE);

    if (!hasAccess) {
      throw new Error('you do not have access to change the email address');
    }

    const token: string = await this.tokenManager.createToken(user);

    const verificationRequest: VerificationRequest = await this.verificationRequestManager
      .createChangeEmailVerificationRequest(user, emailAddress, 'OLD_EMAIL_ADDRESS_NOT_CONFIRMED');

    const confirmationURL: string = this.urlFormatter
      .formatConfirmEmailAddressChangeConfirmationURL(token, verificationRequest.code);

    const hasSucceeded: boolean = await this.mailSender
      .sendConfirmEmailAddressChangeMail(
        user.emailAddress,
        emailAddress,
        confirmationURL
      );

    if (!hasSucceeded) {
      throw new Error('the email containing confirmation link could not be sent');
    }

    return {
      emailAddressChanged: this.createEmailAddressChanged(verificationRequest)
    };
  }

  async confirmEmailAddressChange(user: User, confirmationCode: string): Promise<Information> {
    const hasAccess: boolean = await this.accessChecker.checkUserAccess(user, user, AccessAction.UPDATE);

    if (!hasAccess) {
      throw new Error('you do not have access to confirm the email address');
    }

    let verificationRequest: VerificationRequest | null = await this.verificationRequestManager.completeVerificationRequest(user, confirmationCode);

    if (!verificationRequest) {
      throw new Error('a verification request corresponding to the specified confirmation code could not be found');
    }

    const { oldEmailAddress, newEmailAddress } = verificationRequest.details as EmailAddressChanged;

    verificationRequest = await this.verificationRequestManager
      .createChangeEmailVerificationRequest(user, newEmailAddress, 'NEW_EMAIL_ADDRESS_NOT_CONFIRMED');

    const token: string = await this.tokenManager.createToken(user);

    const confirmationURL: string = this.urlFormatter.formatCompleteEmailAddressChangeConfirmationURL(token, verificationRequest.code);

    const hasSucceeded: boolean = await this.mailSender
      .sendCompleteEmailAddressChangeMail(
        oldEmailAddress,
        newEmailAddress,
        confirmationURL
      );

    if (!hasSucceeded) {
      throw new Error('the email containing confirmation link could not be sent');
    }

    return {
      emailAddressChanged: this.createEmailAddressChanged(verificationRequest)
    };
  }

  async completeEmailAddressChange(user: User, confirmationCode: string): Promise<User> {
    const hasAccess: boolean = await this.accessChecker.checkUserAccess(user, user, AccessAction.UPDATE);

    if (!hasAccess) {
      throw new Error('you do not have access to complete the email address');
    }

    let verificationRequest: VerificationRequest | null = await this.verificationRequestManager.findVerificationRequestByCode(confirmationCode);

    if (!verificationRequest) {
      throw new Error('the verification code with the specified confirmation code could not be found');
    }

    if (verificationRequest.userID !== user.id) {
      throw new Error('the verification request with the specified confirmation code belongs to a different user');
    }

    const {
      newEmailAddress: emailAddress
    } = verificationRequest.details as {
      oldEmailAddress: string;
      newEmailAddress: string
    };

    user = await this.userManager.changeEmailAddress(user, emailAddress);

    verificationRequest = await this.verificationRequestManager.completeVerificationRequest(user, confirmationCode);

    if (!verificationRequest) {
      throw new Error('a verification request corresponding to the specified confirmation code could not be found');
    }

    user = await this.userManager.getUserByID(user.id);

    return user;
  }

  async cancelEmailAddressChange(user: User, confirmationCode: string): Promise<Information> {
    const hasAccess: boolean = await this.accessChecker.checkUserAccess(user, user, AccessAction.UPDATE);

    if (!hasAccess) {
      throw new Error('you do not have access to cancel the email address');
    }

    const verificationRequest: VerificationRequest | null = await this.verificationRequestManager.cancelVerificationRequest(user, confirmationCode);

    if (!verificationRequest) {
      throw new Error('a verification request corresponding to the specified confirmation code could not be found');
    }

    return {
      emailAddressChanged: null
    };
  }

  async resendEmailAddressChange(user: User): Promise<Information> {
    const hasAccess: boolean = await this.accessChecker.checkUserAccess(user, user, AccessAction.UPDATE);

    if (!hasAccess) {
      throw new Error('you do not have access to confirm the email address');
    }

    const verificationRequest: VerificationRequest | null = await this.verificationRequestManager
      .recreateVerificationRequest(user, VerificationRequestPurpose.CHANGE_EMAIL_ADDRESS);

    if (!verificationRequest) {
      throw new Error('a verification request to resend could not be found');
    }

    const emailAddressChanged: EmailAddressChanged = verificationRequest.details as EmailAddressChanged;

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let hasSuccess: boolean = false;

    switch (emailAddressChanged.status) {
      case 'OLD_EMAIL_ADDRESS_NOT_CONFIRMED': {
        const token: string = await this.tokenManager.createToken(user);
        const confirmationURL: string = this.urlFormatter.formatConfirmEmailAddressChangeConfirmationURL(token, verificationRequest.code);

        hasSuccess = await this.mailSender
          .sendConfirmEmailAddressChangeMail(
            emailAddressChanged.oldEmailAddress,
            emailAddressChanged.newEmailAddress,
            confirmationURL
          );
        break;
      }

      case 'NEW_EMAIL_ADDRESS_NOT_CONFIRMED': {
        const token: string = await this.tokenManager.createToken(user);
        const confirmationURL: string = this.urlFormatter.formatCompleteEmailAddressChangeConfirmationURL(token, verificationRequest.code);

        hasSuccess = await this.mailSender
          .sendCompleteEmailAddressChangeMail(
            emailAddressChanged.oldEmailAddress,
            emailAddressChanged.newEmailAddress,
            confirmationURL
          );
        break;
      }
    }

    if (!hasSuccess) {
      throw new Error('an email could not be sent');
    }

    const information: Information = {
      emailAddressChanged: this.createEmailAddressChanged(verificationRequest)
    };

    return information;
  }

  async validateUser(user: User): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const isValid: boolean = !!user.verifiedAt;

    return isValid;
  }

  async checkPassword(user: User, password: string): Promise<boolean> {
    if (!user.saltHash) {
      return false;
    }

    const isValid: boolean = compareSync(password, user.saltHash);

    return isValid;
  }

  async resetPassword(user: User): Promise<User> {
    user = await this.userManager.resetPassword(user);

    return user;
  }

  async changePassword(user: User, oldPassword: string, newPassword: string): Promise<User> {
    user = await this.userManager.changePassword(user, oldPassword, newPassword);

    return user;
  }

  async setPassword(user: User, newPassword: string): Promise<User> {
    user = await this.userManager.setPassword(user, newPassword);

    return user;
  }

  async unsetPassword(user: User, oldPassword: string): Promise<User> {
    user = await this.userManager.unsetPassword(user, oldPassword);

    return user;
  }

  async ensureUserWithProvider(displayName: string, userName: string, emailAddress: string, providerType: ProviderType, providerID: string): Promise<User> {
    const user: User = await this.userManager.ensureUserWithProvider(displayName, userName, emailAddress, providerType, providerID);

    return user;
  }

  async ensureUserNotWithProvider(user: User, providerType: ProviderType): Promise<User> {
    user = await this.userManager.ensureUserNotWithProvider(user, providerType);

    return user;
  }

  async checkUsername(username: string): Promise<User> {
    const user: User | null = await this.userManager.findUserByUsername(username);

    if (!user) {
      throw new Error('a user could not be found');
    }

    const isValid: boolean = (
      await Promise.all(
        [
          await this.validateUser(user)
        ]
      )
    )
      .every((value: boolean) => value);

    if (!isValid) {
      throw new Error('the user could not be validated');
    }

    return user;
  }

  async checkUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    const user: User | null = await this.userManager.findUserByUsername(username);

    if (!user) {
      throw new Error('a user could not be found');
    }

    const isValid: boolean = (
      await Promise.all(
        [
          await this.validateUser(user),
          await this.checkPassword(user, password)
        ]
      )
    )
      .every((value: boolean) => value);

    if (!isValid) {
      throw new Error('the user could not be validated');
    }

    return user;
  }

  async checkUserByUsername(username: string): Promise<User> {
    const user: User | null = await this.userManager.findUserByUsername(username);

    if (!user) {
      throw new Error('a user could not be found');
    }

    const isValid: boolean = (
      await Promise.all(
        [
          await this.validateUser(user)
        ]
      )
    )
      .every((value: boolean) => value);

    if (!isValid) {
      throw new Error('the user could not be validated');
    }

    return user;
  }

  async checkUserByID(id: string): Promise<User> {
    const user: User = await this.userManager.getUserByID(id);

    const isValid: boolean = (
      await Promise.all(
        [
          await this.validateUser(user)
        ]
      )
    )
      .every((value: boolean) => value);

    if (!isValid) {
      throw new Error('the user could not be validated');
    }

    return user;
  }

  async sendMagicLink(username: string, confirmationURL: string): Promise<void> {
    const user: User | null = await this.userManager.findUserByUsername(username);

    if (!user) {
      throw new Error('a user with that username could not be found');
    }

    const magicLoginConfirmationURL: string = new URL(confirmationURL, AUTH_CONSTANTS.Strategies.MagicLogin.baseURL).toString();

    const isSuccess: boolean = await this.mailSender.sendLoginWithMagicLoginMail(user.emailAddress, magicLoginConfirmationURL);

    if (!isSuccess) {
      throw new Error('an email containing the confirmation link could not be sent');
    }
  }

  createEmailAddressChanged(verificationRequest: VerificationRequest | null): EmailAddressChanged | null {
    const emailAddressChanged: EmailAddressChanged | null = verificationRequest
      ? {
        code: verificationRequest.code,
        ...verificationRequest.details
      } as EmailAddressChanged : null;

    return emailAddressChanged;
  }
}
