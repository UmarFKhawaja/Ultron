import { FC } from 'react';
import { NavBarItem } from '../../../NavBarItem';
import { NavBarMenuEndProps } from './props';
import { StyledDiv } from './styles';

interface NavBarMenuEndSubcomponents {
  Item: typeof NavBarItem;
}

export const NavBarMenuEnd: FC<NavBarMenuEndProps> & NavBarMenuEndSubcomponents = ({ children, ...props }: NavBarMenuEndProps) => (
  <StyledDiv {...props}>
    {children}
  </StyledDiv>
);

NavBarMenuEnd.Item = NavBarItem;
