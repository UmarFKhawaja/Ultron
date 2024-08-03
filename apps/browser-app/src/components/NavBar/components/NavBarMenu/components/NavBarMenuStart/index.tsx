import { FC } from 'react';
import { NavBarItem } from '../../../NavBarItem';
import { NavBarMenuStartProps } from './props';
import { StyledDiv } from './styles';

interface NavBarMenuStartSubcomponents {
  Item: typeof NavBarItem;
}

export const NavBarMenuStart: FC<NavBarMenuStartProps> & NavBarMenuStartSubcomponents = ({ children, ...props }: NavBarMenuStartProps) => (
  <StyledDiv {...props}>
    {children}
  </StyledDiv>
);

NavBarMenuStart.Item = NavBarItem;
