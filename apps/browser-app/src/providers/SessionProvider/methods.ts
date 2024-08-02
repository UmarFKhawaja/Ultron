import { DEFAULT_SESSION } from '@ultron/common-library';
import { SessionAction, SessionState } from './types';

export function reduce(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'UPDATE_SESSION':
      return {
        ...state,
        session: action.session
      };

    case 'INVALIDATE_SESSION':
      return {
        ...state,
        session: DEFAULT_SESSION
      };

    default:
      return state;
  }
}
