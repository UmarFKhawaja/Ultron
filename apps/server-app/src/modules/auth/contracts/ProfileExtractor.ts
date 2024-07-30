import { Profile } from '@ultron/core-library';

export interface ProfileExtractor {
  extractProfile(profile: object): Promise<Profile>;
}
