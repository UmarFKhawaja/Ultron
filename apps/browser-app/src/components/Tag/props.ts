import { PropsWithChildren } from 'react';
import { TagColor, TagSize, TagVariant } from './types';

export interface TagProps extends PropsWithChildren {
  className?: string;
  color?: TagColor;
  size?: TagSize;
  variant?: TagVariant;
  light?: boolean;
  hoverable?: boolean;
  rounded?: boolean;
  delete?: boolean;
}
