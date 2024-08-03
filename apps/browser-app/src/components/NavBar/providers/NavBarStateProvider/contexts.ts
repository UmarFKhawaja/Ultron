import { Context, createContext } from 'react';
import { NavBarStateValue } from './types';

export const NavBarStateContext: Context<NavBarStateValue> = createContext<NavBarStateValue>({
  active: false,
  toggleActive: () => {
  }
});
