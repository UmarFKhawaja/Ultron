import { PropsWithChildren } from 'react'
import { ButtonsSize } from './types';

export interface ButtonsProps extends PropsWithChildren {
  className?: string;
  size?: ButtonsSize;
}
