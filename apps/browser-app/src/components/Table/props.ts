import { PropsWithChildren } from 'react';

export interface TableProps extends PropsWithChildren {
  className?: string;
  bordered?: boolean;
  striped?: boolean;
  narrow?: boolean;
  hoverable?: boolean;
  fullWidth?: boolean;
  scrollable?: boolean;
}
