import { useCallback, useState } from 'react';
import { useTheme } from '../../providers';
import { Button } from '../Button';
import { Buttons } from '../Buttons';
import { Glyph } from '../Glyph';
import { Icon } from '../Icon';
import { NavBarBrand, NavBarMenu } from './components';
import { NavBarProps } from './props';
import { StyledNav } from './styles';

export function NavBar({ ...props }: NavBarProps) {
  const { theme, toggleTheme } = useTheme();

  const [active, setActive] = useState<boolean>(false);

  const toggleActive = useCallback(() => setActive((active: boolean) => !active), [setActive]);

  return (
    <StyledNav theme={theme} {...props}>
      <NavBarBrand href="https://bulma.io">
        <NavBarBrand.Logo/>
        <NavBarBrand.Burger target="navbar-menu" active={active} onClick={toggleActive}/>
      </NavBarBrand>
      <NavBarMenu id="navbar-menu" active={active}>
        <NavBarMenu.End>
          <NavBarMenu.End.Item>
            <Buttons>
              <Button as="a" variant="primary">
                Register
              </Button>
              <Button as="a">
                Login
              </Button>
              <Button onClick={toggleTheme}>
                <Icon>
                  {
                    theme === 'light'
                      ? <Glyph name="moon-o"/>
                      : <Glyph name="sun-o"/>
                  }
                </Icon>
              </Button>
              <Button>
                <Icon>
                  <Glyph name="ellipsis-v"/>
                </Icon>
              </Button>
            </Buttons>
          </NavBarMenu.End.Item>
        </NavBarMenu.End>
      </NavBarMenu>
    </StyledNav>
  );
}
