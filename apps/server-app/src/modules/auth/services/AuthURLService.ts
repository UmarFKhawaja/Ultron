import { VerificationRequest } from '@ultron/core-library';
import { injectable } from 'inversify';
import { AUTH_CONSTANTS } from '../constants';
import { URLService } from '../contracts';

@injectable()
export class AuthURLService implements URLService {
  formatRegisterVerificationURL(verificationRequest: VerificationRequest): string {
    const url: URL = new URL(AUTH_CONSTANTS.Actions.ActivateAccount.path, AUTH_CONSTANTS.Actions.baseURL);

    url.searchParams.set('code', verificationRequest.code);

    return url.toString();
  }

  formatRecoverAccountConfirmationURL(token: string): string {
    const url: URL = new URL(AUTH_CONSTANTS.Actions.RecoverAccount.path, AUTH_CONSTANTS.Actions.baseURL);

    url.searchParams.set('token', token);

    return url.toString();
  }

  formatConfirmEmailAddressChangeConfirmationURL(token: string, code: string): string {
    const url: URL = new URL(AUTH_CONSTANTS.Actions.ConfirmEmailAddressChange.path, AUTH_CONSTANTS.Actions.baseURL);

    url.searchParams.set('token', token);
    url.searchParams.set('code', code);

    return url.toString();
  }

  formatCompleteEmailAddressChangeConfirmationURL(token: string, code: string): string {
    const url: URL = new URL(AUTH_CONSTANTS.Actions.CompleteEmailAddressChange.path, AUTH_CONSTANTS.Actions.baseURL);

    url.searchParams.set('token', token);
    url.searchParams.set('code', code);

    return url.toString();
  }
}
