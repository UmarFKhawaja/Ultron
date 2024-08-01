import { ProviderType, User } from '@ultron/core-library';
import { Container } from 'inversify';
import { Profile, VerifyCallback as DoneFunction } from 'passport-google-oauth20';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreManager, ProfileExtractor } from '../../../contracts';
import { VerifyFunction } from '../types';

export function verifyUser(container: Container): VerifyFunction {
  const coreManager: CoreManager = container.get<CoreManager>(AUTH_CONSTANTS.Symbols.Services.CoreManager);
  const profileExtractor: ProfileExtractor = container.getNamed<ProfileExtractor>(
    AUTH_CONSTANTS.Symbols.Services.ProfileExtractor,
    AUTH_CONSTANTS.Names.Strategies.GoogleStrategy
  );

  return async (accessToken: string, refreshToken: string, profile: Profile, done: DoneFunction): Promise<void> => {
    const {
      id,
      displayName,
      userName,
      emailAddress
    } = await profileExtractor.extractProfile(profile);

    const user: User | null = await coreManager.ensureUserWithProvider(displayName, userName, emailAddress, ProviderType.GOOGLE, id);

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
