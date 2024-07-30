import { ProviderType, User } from '@ultron/core-library';
import { Container } from 'inversify';
import { Profile, VerifyFunction } from 'passport-facebook';
import { AUTH_CONSTANTS } from '../../../constants';
import { CoreManager, ProfileExtractor } from '../../../contracts';

type DoneFunction = (error: any, user?: any, info?: any) => void;

export function verifyUser(container: Container): VerifyFunction {
  const coreManager: CoreManager = container.get<CoreManager>(AUTH_CONSTANTS.Symbols.Services.CoreManager);
  const profileExtractor: ProfileExtractor = container.getNamed<ProfileExtractor>(
    AUTH_CONSTANTS.Symbols.Services.ProfileExtractor,
    AUTH_CONSTANTS.Names.Services.FacebookProfileExtractor
  );

  return async (accessToken: string, refreshToken: string, profile: Profile, done: DoneFunction): Promise<void> => {
    const {
      id,
      displayName,
      userName,
      emailAddress
    } = await profileExtractor.extractProfile(profile);

    const user: User | null = await coreManager.ensureUserWithProvider(displayName, userName, emailAddress, ProviderType.FACEBOOK, id);

    if (!user) {
      done(new Error('a user linked to the Facebook ID could not be found'));
    } else {
      if (!user.verifiedAt) {
        done(new Error('the user linked to the Facebook ID was not verified'));
      } else {
        done(null, user);
      }
    }
  };
}
