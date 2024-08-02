import { FC } from 'react';
import { NavBarBurgerProps } from './props';
import { StyledAnchor, StyledSpan } from './styles';

export const NavBarBurger: FC<NavBarBurgerProps> = ({ target }: NavBarBurgerProps) => (
  <StyledAnchor target={target}>
    <StyledSpan/>
    <StyledSpan/>
    <StyledSpan/>
    <StyledSpan/>
  </StyledAnchor>
);
