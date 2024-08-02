import { FC } from 'react';
import { NavBarItem } from '../../../NavBarItem';
import { NavBarEndProps } from './props';
import { StyledDiv } from './styles';

interface NavBarEndSubcomponents {
  Item: typeof NavBarItem;
}

export const NavBarEnd: FC<NavBarEndProps> & NavBarEndSubcomponents = ({ children, ...props }: NavBarEndProps) => (
  <StyledDiv {...props}>
    {children}
  </StyledDiv>
);

NavBarEnd.Item = NavBarItem;
