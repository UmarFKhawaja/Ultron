import { FC } from 'react';
import { useTheme } from '../../providers';
import { NavBarBrand, NavBarBurger, NavBarDropdown, NavBarItem, NavBarMenu } from './components';
import { NavBarProps } from './props';
import { NavBarStateProvider } from './providers';
import { StyledNav } from './styles';

interface NavBarSubcomponents {
  Brand: typeof NavBarBrand;
  Burger: typeof NavBarBurger;
  Item: typeof NavBarItem;
  Menu: typeof NavBarMenu;
  Dropdown: typeof NavBarDropdown;
}

export const NavBar: FC<NavBarProps> & NavBarSubcomponents = ({ children, ...props }: NavBarProps) => {
  const { theme } = useTheme();

  return (
    <NavBarStateProvider>
      <StyledNav theme={theme} {...props}>
        {children}
      </StyledNav>
    </NavBarStateProvider>
  );
};

NavBar.Brand = NavBarBrand;

NavBar.Burger = NavBarBurger;

NavBar.Item = NavBarItem;

NavBar.Menu = NavBarMenu;

NavBar.Dropdown = NavBarDropdown;
