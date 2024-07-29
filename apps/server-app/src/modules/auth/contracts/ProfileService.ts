import { Profile } from '@ultron/core-library';

export interface ProfileService {
  extractProfile(profile: object): Promise<Profile>;
}
