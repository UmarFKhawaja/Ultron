import { FC, useCallback, useContext, useMemo, useReducer } from 'react';
import { NavBarStateContext } from './contexts';
import { reduce } from './methods';
import { NavBarStateProviderProps } from './props';
import { NavBarStateValue } from './types';

export const NavBarStateProvider: FC<NavBarStateProviderProps> = ({ children, ...props }: NavBarStateProviderProps) => {
  const [state, dispatch] = useReducer(reduce, {
    active: false
  });

  const toggleActive = useCallback(() => {
    dispatch({
      type: 'TOGGLE_ACTIVE'
    });
  }, [dispatch]);

  const value: NavBarStateValue = useMemo(() => ({
    ...state,
    toggleActive
  }), [state, toggleActive]);

  return (
    <NavBarStateContext.Provider value={value}>
      {children}
    </NavBarStateContext.Provider>
  );
};

export function useNavBarState(): NavBarStateValue {
  return useContext<NavBarStateValue>(NavBarStateContext);
}
