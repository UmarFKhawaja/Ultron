import { Context, createContext } from 'react';
import { ThemeValue } from './types';

export const ThemeContext: Context<ThemeValue> = createContext<ThemeValue>({
  theme: 'light',
  toggleTheme: (): void => {}
});
