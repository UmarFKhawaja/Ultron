import { ProfileService, ProviderType, User } from '@ultron/core-library';
import { Container } from 'inversify';
import { Profile, VerifyFunction } from 'passport-facebook';
import { AUTH_CONSTANTS } from '../../../constants';
import { AuthCoreService } from '../../../services';

type DoneFunction = (error: any, user?: any, info?: any) => void;

export function verifyUser(container: Container): VerifyFunction {
  const coreService: AuthCoreService = container.get<AuthCoreService>(AUTH_CONSTANTS.Symbols.Services.CoreService);
  const profileService: ProfileService = container.getNamed<ProfileService>(
    AUTH_CONSTANTS.Symbols.Services.ProfileService,
    AUTH_CONSTANTS.Names.Services.Facebook
  );

  return async (accessToken: string, refreshToken: string, profile: Profile, done: DoneFunction): Promise<void> => {
    const {
      id,
      displayName,
      userName,
      emailAddress
    } = await profileService.extractProfile(profile);

    const user: User | null = await coreService.ensureUserWithProvider(displayName, userName, emailAddress, ProviderType.FACEBOOK, id);

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
