import { CheckResourceRequest, CheckResourcesResult, Principal, Resource } from '@cerbos/core';
import { GRPC as GRPCConnection } from '@cerbos/grpc';
import {
  AccessAction,
  AccessResourceKind,
  AccessRole,
  AccessService,
  Account, EMPTY_UUID,
  User,
  VerificationRequest
} from '@ultron/core-library';
import { inject, injectable } from 'inversify';
import { CERBOS_CONSTANTS } from '../constants';
import { GRPCConnectionProvider } from '../types';

@injectable()
export class CerbosAccessService implements AccessService {
  constructor(
    @inject(CERBOS_CONSTANTS.Symbols.Providers.GRPCConnectionProvider)
    private readonly provideGRCPConnection: GRPCConnectionProvider
  ) {
  }

  async checkUserAccess(principal: User, resource: User | null, ...actions: AccessAction[]): Promise<boolean> {
    const request: CheckResourceRequest = {
      principal: this.createUserPrincipal(principal),
      resource: this.createUserResource(resource),
      actions
    };

    const connection: GRPCConnection = await this.provideGRCPConnection();

    const result: CheckResourcesResult = await connection.checkResource(request);

    const isAllowed: boolean = result.allAllowed();

    return isAllowed;
  }

  async checkAccountAccess(principal: User, resource: Account | null, ...actions: AccessAction[]): Promise<boolean> {
    const request: CheckResourceRequest = {
      principal: this.createUserPrincipal(principal),
      resource: this.createAccountResource(resource),
      actions
    };

    const connection: GRPCConnection = await this.provideGRCPConnection();

    const result: CheckResourcesResult = await connection.checkResource(request);

    const isAllowed: boolean = result.allAllowed();

    return isAllowed;
  }

  async checkVerificationRequestAccess(principal: User, resource: VerificationRequest | null, ...actions: AccessAction[]): Promise<boolean> {
    const request: CheckResourceRequest = {
      principal: this.createUserPrincipal(principal),
      resource: this.createVerificationRequestResource(resource),
      actions
    };

    const connection: GRPCConnection = await this.provideGRCPConnection();

    const result: CheckResourcesResult = await connection.checkResource(request);

    const isAllowed: boolean = result.allAllowed();

    return isAllowed;
  }

  private createUserPrincipal(principal: User): Principal {
    return {
      id: principal.id,
      roles: [
        AccessRole.USER
      ],
      attr: {}
    };
  }

  private createUserResource(resource: User | null): Resource {
    return {
      id: resource?.id || EMPTY_UUID,
      kind: AccessResourceKind.USER,
      attr: {}
    };
  }

  private createAccountResource(resource: Account | null): Resource {
    return {
      id: resource?.id || EMPTY_UUID,
      kind: AccessResourceKind.ACCOUNT,
      attr: {
        ...(resource ? {
          userID: resource.user.id
        } : {})
      }
    };
  }

  private createVerificationRequestResource(resource: VerificationRequest | null): Resource {
    return {
      id: resource?.id || EMPTY_UUID,
      kind: AccessResourceKind.VERIFICATION_REQUEST,
      attr: {
        ...(resource ? {
          userID: resource.userID
        } : {})
      }
    };
  }
}
