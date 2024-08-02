import { PropsWithChildren } from 'react';
import { DeleteSize } from './types';

export interface DeleteProps extends PropsWithChildren {
  className?: string;
  size?: DeleteSize;
  onClick: () => void;
}
