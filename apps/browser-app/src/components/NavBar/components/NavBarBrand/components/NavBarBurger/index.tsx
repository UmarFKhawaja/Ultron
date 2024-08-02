import { FC } from 'react';
import { useTheme } from '../../../../../../providers';
import { NavBarBurgerProps } from './props';
import { StyledAnchor, StyledSpan } from './styles';

export const NavBarBurger: FC<NavBarBurgerProps> = ({ ...props }: NavBarBurgerProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledAnchor theme={theme} {...props}>
      <StyledSpan theme={theme}/>
      <StyledSpan theme={theme}/>
      <StyledSpan theme={theme}/>
      <StyledSpan theme={theme}/>
    </StyledAnchor>
  );
};
