import { PropsWithChildren } from 'react';
import { ImageSize } from './types';

export interface ImageProps extends PropsWithChildren {
  className?: string;
  rounded?: boolean;
  retina?: boolean;
  size?: ImageSize;
  fullWidth?: boolean;
}
