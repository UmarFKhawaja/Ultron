import { PropsWithChildren } from 'react';
import { NavBarVariant } from './types';

export interface NavBarProps extends PropsWithChildren {
  className?: string;
  transparent?: boolean;
  variant?: NavBarVariant;
}
