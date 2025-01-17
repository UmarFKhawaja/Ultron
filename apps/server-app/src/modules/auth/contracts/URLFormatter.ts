import { VerificationRequest } from '@ultron/core-library';

export interface URLFormatter {
  formatRegisterVerificationURL(verificationRequest: VerificationRequest): string;

  formatRecoverAccountConfirmationURL(token: string): string;

  formatConfirmEmailAddressChangeConfirmationURL(token: string, code: string): string;

  formatCompleteEmailAddressChangeConfirmationURL(token: string, code: string): string;
}
