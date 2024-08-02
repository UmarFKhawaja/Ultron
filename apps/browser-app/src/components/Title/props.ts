import { PropsWithChildren } from 'react';
import { TitleSize } from './types';

export interface TitleProps extends PropsWithChildren {
  className?: string;
  size: TitleSize;
}
