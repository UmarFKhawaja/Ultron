import { Profile } from '@ultron/core-library';
import { injectable } from 'inversify';
import { ProfileExtractor } from '../../../contracts';

interface Email {
  value: string;
}

@injectable()
export class AuthFacebookProfileExtractor implements ProfileExtractor {
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

    const emailAddress: string = emails.shift()?.value || '';

    const userName: string = emailAddress.split('@')[0];

    return {
      id,
      displayName,
      userName,
      emailAddress
    };
  }
}
