import { PropsWithChildren } from 'react';
import { TableCellColor } from './types';

export interface TableCellProps extends PropsWithChildren {
  className?: string;
  color?: TableCellColor;
}
