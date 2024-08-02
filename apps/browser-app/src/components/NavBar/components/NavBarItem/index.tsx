import { ComponentPropsWithoutRef, ElementType } from 'react';
import clsx from 'clsx';
import { NavBarItemProps } from './props';

export const NavBarItem = <T extends ElementType>({ as, ...props }: NavBarItemProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof NavBarItemProps<T>>) => {
  const Component = as || 'div';

  return <Component className={clsx('navbar-item', props.className)} {...props} />;
};
