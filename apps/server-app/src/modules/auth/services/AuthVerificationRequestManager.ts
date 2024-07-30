import {
  User,
  VerificationRequest,
  VerificationRequestHelper,
  VerificationRequestPurpose,
  VerificationRequestStatus
} from '@ultron/core-library';
import { MYSQL_CONSTANTS } from '@ultron/data-library';
import { inject, injectable } from 'inversify';

@injectable()
export class AuthVerificationRequestManager {
  constructor(
    @inject(MYSQL_CONSTANTS.Symbols.Services.VerificationRequestHelper)
    private readonly verificationRequestHelper: VerificationRequestHelper
  ) {
  }

  async recreateVerificationRequest(user: User, purpose: VerificationRequestPurpose): Promise<VerificationRequest | null> {
    return await this.verificationRequestHelper.recreateVerificationRequest(user.id, purpose);
  }

  async createRegisterVerificationRequest(user: User): Promise<VerificationRequest> {
    await this.verificationRequestHelper.cancelAllVerificationRequestsForUser(user.id, VerificationRequestPurpose.REGISTER);

    const verificationRequest: VerificationRequest = await this.verificationRequestHelper.createVerificationRequest(
      user.id,
      user.id,
      'User',
      {},
      VerificationRequestPurpose.REGISTER
    );

    return verificationRequest;
  }

  async createChangeEmailVerificationRequest(user: User, emailAddress: string, status: 'OLD_EMAIL_ADDRESS_NOT_CONFIRMED' | 'NEW_EMAIL_ADDRESS_NOT_CONFIRMED'): Promise<VerificationRequest> {
    if (!emailAddress) {
      throw new Error('a new email address has not been provided');
    }

    await this.verificationRequestHelper.cancelAllVerificationRequestsForUser(user.id, VerificationRequestPurpose.CHANGE_EMAIL_ADDRESS);

    const verificationRequest: VerificationRequest = await this.verificationRequestHelper.createVerificationRequest(
      user.id,
      user.id,
      'User',
      {
        status,
        oldEmailAddress: user.emailAddress,
        newEmailAddress: emailAddress
      },
      VerificationRequestPurpose.CHANGE_EMAIL_ADDRESS
    );

    return verificationRequest;
  }

  async completeVerificationRequest(user: User, code: string): Promise<VerificationRequest> {
    return await this.updateVerificationRequest(user, code, VerificationRequestStatus.COMPLETED);
  }

  async cancelVerificationRequest(user: User, code: string): Promise<VerificationRequest> {
    return await this.updateVerificationRequest(user, code, VerificationRequestStatus.CANCELLED);
  }

  async expireVerificationRequest(user: User, code: string): Promise<VerificationRequest> {
    return await this.updateVerificationRequest(user, code, VerificationRequestStatus.EXPIRED);
  }

  async findVerificationRequestByCode(code: string): Promise<VerificationRequest | null> {
    return await this.verificationRequestHelper.findVerificationRequestByCode(code);
  }

  async findVerificationRequestByUserAndPurpose(user: User, purpose: VerificationRequestPurpose): Promise<VerificationRequest | null> {
    if (!user) {
      throw new Error('a user must be provided when finding verification requests by user');
    }

    return await this.verificationRequestHelper.findVerificationRequestsByUserIDAndPurpose(user.id, purpose);
  }

  private async updateVerificationRequest(user: User, code: string, status: VerificationRequestStatus): Promise<VerificationRequest> {
    let verificationRequest: VerificationRequest | null = await this.verificationRequestHelper.findVerificationRequestByCode(code);

    if (!verificationRequest) {
      throw new Error('a verification request with the specified code could not be found');
    }

    if (verificationRequest.userID !== user.id.toString()) {
      throw new Error('the verification request with the specified code belongs to a different user');
    }

    if (verificationRequest.status !== VerificationRequestStatus.STARTED) {
      throw new Error('the verification request with the specified code has either been completed, or cancelled, or is expired');
    }

    verificationRequest = await this.verificationRequestHelper.updateVerificationRequestStatus(verificationRequest.id, status);

    return verificationRequest;
  }

  async getUserForVerificationRequest(code: string): Promise<User> {
    return await this.verificationRequestHelper.getUserForVerificationRequest(code);
  }
}
