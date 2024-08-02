import { FC } from 'react';
import { NavBarEnd, NavBarStart } from './components';
import { NavBarMenuProps } from './props';
import { StyledDiv } from './styles';

interface NavBarMenuSubcomponents {
  Start: typeof NavBarStart;
  End: typeof NavBarEnd;
}

export const NavBarMenu: FC<NavBarMenuProps> & NavBarMenuSubcomponents = ({ children, ...props }: NavBarMenuProps) => (
  <StyledDiv {...props}>
    {children}
  </StyledDiv>
);

NavBarMenu.Start = NavBarStart;

NavBarMenu.End = NavBarEnd;
