import { PropsWithChildren } from 'react';
import { ContainerSize } from './types';

export interface ContainerProps extends PropsWithChildren {
  className?: string;
  fluid?: boolean;
  size?: ContainerSize;
}
