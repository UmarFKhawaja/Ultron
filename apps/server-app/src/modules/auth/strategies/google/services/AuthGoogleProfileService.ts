import { Profile, ProfileService } from '@ultron/core-library';
import { injectable } from 'inversify';

interface Email {
  value: string;
  verified: boolean;
}

@injectable()
export class AuthGoogleProfileService implements ProfileService {
  async extractProfile(profile: object): Promise<Profile> {
    const {
      id,
      displayName,
      emails
    } = profile as {
      id: string;
      displayName: string;
      emails: Email[];
    };

    const emailAddress: string = emails.filter((email: Email) => email.verified).shift()?.value || '';

    const userName: string = emailAddress.split('@')[0];

    return {
      id,
      displayName,
      userName,
      emailAddress
    };
  }
}
