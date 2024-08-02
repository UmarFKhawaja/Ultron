import { FC, useCallback, useContext, useMemo, useReducer } from 'react';
import { ThemeContext } from './contexts';
import { reduce } from './methods';
import { ThemeProviderProps } from './props';
import { ThemeValue } from './types';

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }: ThemeProviderProps) => {
  const [state, dispatch] = useReducer(reduce, {
    theme: 'light'
  });

  const toggleTheme = useCallback((): void => {
    dispatch({
      type: 'TOGGLE_THEME'
    });
  }, [dispatch]);

  const value: ThemeValue = useMemo((): ThemeValue => ({
    ...state,
    toggleTheme
  }), [state, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeValue {
  return useContext<ThemeValue>(ThemeContext);
}
