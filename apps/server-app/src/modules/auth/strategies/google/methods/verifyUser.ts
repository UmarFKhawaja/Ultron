import { ProviderType, User } from '@ultron/core-library';
import { Container } from 'inversify';
import { Profile, VerifyCallback as DoneFunction } from 'passport-google-oauth20';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreService, ProfileService } from '../../../contracts';
import { VerifyFunction } from '../types';

export function verifyUser(container: Container): VerifyFunction {
  const coreService: CoreService = container.get<CoreService>(AUTH_CONSTANTS.Symbols.Services.CoreService);
  const profileService: ProfileService = container.getNamed<ProfileService>(
    AUTH_CONSTANTS.Symbols.Services.ProfileService,
    AUTH_CONSTANTS.Names.Services.GoogleProfileService
  );

  return async (accessToken: string, refreshToken: string, profile: Profile, done: DoneFunction): Promise<void> => {
    const {
      id,
      displayName,
      userName,
      emailAddress
    } = await profileService.extractProfile(profile);

    const user: User | null = await coreService.ensureUserWithProvider(displayName, userName, emailAddress, ProviderType.GOOGLE, id);

    if (!user) {
      done(new Error('a user linked to the Google ID could not be found'));
    } else {
      if (!user.verifiedAt) {
        done(new Error('the user linked to the Google ID was not verified'));
      } else {
        done(null, user);
      }
    }
  };
}
