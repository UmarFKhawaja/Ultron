import { ElementType, PropsWithChildren } from 'react';
import { ButtonColor, ButtonSize, ButtonTheme, ButtonVariant } from './types';

export interface ButtonProps<T extends ElementType | 'a' | 'button' | 'input'> extends PropsWithChildren {
  className?: string;
  as?: T;
  color?: ButtonColor;
  size?: ButtonSize;
  theme?: ButtonTheme;
  variant?: ButtonVariant;
}
