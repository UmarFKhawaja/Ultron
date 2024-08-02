import { PropsWithChildren } from 'react';
import { TableRowColor } from './types';

export interface TableRowProps extends PropsWithChildren {
  className?: string;
  color?: TableRowColor;
  selected?: boolean;
}
