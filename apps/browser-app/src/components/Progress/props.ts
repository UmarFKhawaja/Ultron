import { PropsWithChildren } from 'react';
import { ProgressSize, ProgressVariant } from './types';

export interface ProgressProps extends PropsWithChildren {
  className?: string;
  variant?: ProgressVariant;
  size?: ProgressSize;
  value?: number;
  max: number;
}
