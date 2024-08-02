import { PropsWithChildren } from 'react';

export interface NavBarMenuProps extends PropsWithChildren {
  id: string;
  className?: string;
  active: boolean;
}
