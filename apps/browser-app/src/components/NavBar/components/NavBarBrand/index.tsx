import { Children, FC, ReactElement, ReactNode, useMemo } from 'react';
import { isElement } from 'react-is';
import { NavBarItem } from '../NavBarItem';
import { NavBarBurger, NavBarLogo } from './components';
import { NavBarBrandProps } from './props';
import { StyledDiv } from './styles';

interface NavBarBrandSubcomponents {
  Logo: typeof NavBarLogo;
  Burger: typeof NavBarBurger;
}

export const NavBarBrand: FC<NavBarBrandProps> & NavBarBrandSubcomponents = ({ href, children, ...props }: NavBarBrandProps) => {
  const elements = useMemo(() => Children
    .toArray(children)
    .filter((child: ReactNode) => isElement(child))
    .map((child: ReactNode) => child as ReactElement), [children]);

  const logo = useMemo(() => elements
    .filter((element: ReactElement) => element.type === NavBarLogo)
    .shift(), [elements]);

  const burger = useMemo(() => elements
    .filter((element: ReactElement) => element.type === NavBarBurger)
    .shift(), [elements]);

  return (
    <StyledDiv {...props}>
      <NavBarItem as="a" href={href}>
        {logo}
      </NavBarItem>
      {burger}
    </StyledDiv>
  );
};

NavBarBrand.Logo = NavBarLogo;

NavBarBrand.Burger = NavBarBurger;
