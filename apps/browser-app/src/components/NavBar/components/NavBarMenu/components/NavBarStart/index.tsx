import { FC } from 'react';
import { NavBarItem } from '../../../NavBarItem';
import { NavBarStartProps } from './props';
import { StyledDiv } from './styles';

interface NavBarStartSubcomponents {
  Item: typeof NavBarItem;
}

export const NavBarStart: FC<NavBarStartProps> & NavBarStartSubcomponents = ({ children, ...props }: NavBarStartProps) => (
  <StyledDiv {...props}>
    {children}
  </StyledDiv>
);

NavBarStart.Item = NavBarItem;
