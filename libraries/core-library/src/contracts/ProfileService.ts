import { Profile } from '../types';

export interface ProfileService {
  extractProfile(profile: object): Promise<Profile>;
}
