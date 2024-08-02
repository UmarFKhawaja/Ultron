import { ElementType, PropsWithChildren } from 'react';

export interface NavBarItemProps<T extends ElementType> extends PropsWithChildren {
  className?: string;
  as?: T;
}
