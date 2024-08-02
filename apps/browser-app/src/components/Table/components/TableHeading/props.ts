import { PropsWithChildren } from 'react';
import { TableHeadingColor } from './types';

export interface TableHeadingProps extends PropsWithChildren {
  className?: string;
  color?: TableHeadingColor;
}
