import { FC } from 'react';
import { useNavBarState } from '../../providers';
import { NavBarMenuEnd, NavBarMenuStart } from './components';
import { NavBarMenuProps } from './props';
import { StyledDiv } from './styles';

interface NavBarMenuSubcomponents {
  Start: typeof NavBarMenuStart;
  End: typeof NavBarMenuEnd;
}

export const NavBarMenu: FC<NavBarMenuProps> & NavBarMenuSubcomponents = ({ children, ...props }: NavBarMenuProps) => {
  const { active } = useNavBarState();

  return (
    <StyledDiv {...{ ...props, active }}>
      {children}
    </StyledDiv>
  );
};

NavBarMenu.Start = NavBarMenuStart;

NavBarMenu.End = NavBarMenuEnd;
