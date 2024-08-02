import { Session } from '../types';

export const EMPTY_UUID: string = '00000000-0000-0000-0000-000000000000';

export const DEFAULT_SESSION: Session = {
  id: EMPTY_UUID,
  sub: '',
  displayName: '',
  userName: '',
  emailAddress: '',
  accounts: {
    local: false,
    social: {
      facebook: false,
      google: false
    }
  }
};
