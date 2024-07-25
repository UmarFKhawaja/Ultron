import {
  User,
  VerificationRequest,
  VerificationRequestPurpose,
  VerificationRequestService,
  VerificationRequestStatus
} from '@ultron/core-library';
import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { In } from 'typeorm';
import { v4 as generateUUID } from 'uuid';
import { MYSQL_CONSTANTS } from '../constants';
import { RepositoriesProvider } from '../types';

@injectable()
export class MySQLVerificationRequestService implements VerificationRequestService {
  constructor(
    @inject(MYSQL_CONSTANTS.Symbols.Providers.RepositoriesProvider)
    private readonly provideRepositories: RepositoriesProvider
  ) {
  }

  async recreateVerificationRequest(userID: string, purpose: VerificationRequestPurpose): Promise<VerificationRequest> {
    const {
      verificationRequestRepository
    } = await this.provideRepositories();

    let verificationRequest: VerificationRequest | null = await verificationRequestRepository
      .findOne({
        where: {
          userID,
          purpose,
          status: In([
            VerificationRequestStatus.STARTED,
            VerificationRequestStatus.EXPIRED
          ])
        },
        order: {
          expiresAt: 'desc'
        }
      });

    if (!verificationRequest) {
      throw new Error('a verification request with the specified purpose could not be found');
    }

    await this.updateVerificationRequestStatus(verificationRequest.id, VerificationRequestStatus.CANCELLED);

    verificationRequest = verificationRequestRepository.create({
      code: generateUUID(),
      userID: verificationRequest.userID,
      resourceID: verificationRequest.resourceID,
      resourceType: verificationRequest.resourceType,
      details: verificationRequest.details,
      purpose: verificationRequest.purpose,
      status: VerificationRequestStatus.STARTED,
      expiresAt: dayjs().add(1, 'day').toDate()
    });

    verificationRequest = await verificationRequestRepository.save(verificationRequest);

    return verificationRequest;
  }

  async createVerificationRequest(userID: string, resourceID: string, resourceType: string, details: object, purpose: VerificationRequestPurpose): Promise<VerificationRequest> {
    const {
      verificationRequestRepository
    } = await this.provideRepositories();

    let verificationRequest = verificationRequestRepository.create({
      code: generateUUID(),
      userID,
      resourceID,
      resourceType,
      details,
      purpose,
      status: VerificationRequestStatus.STARTED,
      expiresAt: dayjs().add(1, 'day').toDate()
    });

    verificationRequest = await verificationRequestRepository.save(verificationRequest);

    return verificationRequest;
  }

  async updateVerificationRequestStatus(verificationRequestID: string, verificationRequestStatus: VerificationRequestStatus): Promise<VerificationRequest> {
    const {
      verificationRequestRepository
    } = await this.provideRepositories();

    await verificationRequestRepository
      .update({
        id: verificationRequestID
      }, {
        status: verificationRequestStatus
      });

    const verificationRequest: VerificationRequest | null = await verificationRequestRepository
      .findOne({
        where: {
          id: verificationRequestID
        }
      });

    if (!verificationRequest) {
      throw new Error('a verification request with the specified ID could not be found');
    }

    return verificationRequest;
  }

  async cancelAllVerificationRequestsForUser(userID: string, purpose: VerificationRequestPurpose): Promise<void> {
    const {
      verificationRequestRepository
    } = await this.provideRepositories();

    await verificationRequestRepository
      .update({
        userID,
        purpose,
        status: VerificationRequestStatus.STARTED
      }, {
        status: VerificationRequestStatus.CANCELLED
      });
  }

  async findVerificationRequestByCode(code: string): Promise<VerificationRequest | null> {
    const {
      verificationRequestRepository
    } = await this.provideRepositories();

    const verificationRequest: VerificationRequest | null = await verificationRequestRepository
      .findOne({
        where: {
          code
        }
      });

    return verificationRequest;
  }

  async findVerificationRequestsByUserIDAndPurpose(userID: string, purpose: VerificationRequestPurpose): Promise<VerificationRequest | null> {
    const {
      verificationRequestRepository
    } = await this.provideRepositories();

    const verificationRequest: VerificationRequest | null = await verificationRequestRepository
      .findOne({
        where: {
          userID,
          purpose,
          status: VerificationRequestStatus.STARTED
        }
      });

    return verificationRequest;
  }

  async getUserForVerificationRequest(code: string): Promise<User> {
    const {
      userRepository,
      verificationRequestRepository
    } = await this.provideRepositories();

    const verificationRequest: VerificationRequest | null = await verificationRequestRepository
      .findOne({
        where: {
          code
        }
      });

    if (!verificationRequest) {
      throw new Error('a verification request with the specified code could not be found');
    }

    const user: User | null = await userRepository
      .findOne({
        where: {
          id: verificationRequest.userID
        }
      });

    if (!user) {
      throw new Error('a user linked to the verification request with the specified code could not be found');
    }

    return user;
  }
}
