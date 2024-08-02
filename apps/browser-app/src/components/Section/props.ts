import { PropsWithChildren } from 'react';
import { SectionSize } from './types';

export interface SectionProps extends PropsWithChildren {
  className?: string;
  size?: SectionSize;
}
