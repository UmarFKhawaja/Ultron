import { PropsWithChildren } from 'react';
import { SubtitleSize } from './types';

export interface SubtitleProps extends PropsWithChildren {
  className?: string;
  size: SubtitleSize;
}
