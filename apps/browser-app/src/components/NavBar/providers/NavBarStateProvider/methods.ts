import { NavBarStateAction, NavBarStateState } from './types';

export function reduce(state: NavBarStateState, action: NavBarStateAction): NavBarStateState {
  switch (action.type) {
    case 'TOGGLE_ACTIVE':
      return {
        ...state,
        active: !state.active
      };

    default:
      return state;
  }
}
