import { Theme } from '../../types';

export interface ThemeState {
  theme: Theme;
}

export interface ThemeToggleThemeAction {
  type: 'TOGGLE_THEME';
}

export type ThemeAction =
  | ThemeToggleThemeAction;

export interface ThemeValue extends ThemeState {
  toggleTheme: () => void;
}
