import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { useNavBarState } from '../../providers';
import { NavBarBurgerProps } from './props';
import { StyledAnchor, StyledSpan } from './styles';

export const NavBarBurger: FC<NavBarBurgerProps> = ({ ...props }: NavBarBurgerProps) => {
  const { theme } = useTheme();

  const { active, toggleActive } = useNavBarState();

  return (
    <StyledAnchor theme={theme} onClick={toggleActive} {...{ ...props, active }}>
      <StyledSpan theme={theme}/>
      <StyledSpan theme={theme}/>
      <StyledSpan theme={theme}/>
      <StyledSpan theme={theme}/>
    </StyledAnchor>
  );
};
