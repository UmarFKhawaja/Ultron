import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Buttons, Glyph, Icon, NavBar } from '../../components';
import { useTheme } from '../../providers';
import { Logo } from '../Logo';
import { ThemeIcon } from '../ThemeIcon';
import { TopBarProps } from './props';

export const TopBar: FC<TopBarProps> = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <NavBar variant="fixed-top">
      <NavBar.Brand>
        <NavBar.Item as={Link} to="/">
          <Logo theme={theme}/>
        </NavBar.Item>
        <NavBar.Burger target="navbar-menu"/>
      </NavBar.Brand>
      <NavBar.Menu id="navbar-menu">
        <NavBar.Menu.Start>
          <NavBar.Dropdown text="About">
            <NavBar.Item as={Link} to="/history">
              History
            </NavBar.Item>
            <NavBar.Item as={Link} to="/mission-statement">
              Mission Statement
            </NavBar.Item>
          </NavBar.Dropdown>
        </NavBar.Menu.Start>
        <NavBar.Menu.End>
          <NavBar.Menu.End.Item>
            <Buttons>
              <Button as="a" variant="primary">
                Register
              </Button>
              <Button as="a">
                Login
              </Button>
              <Button onClick={toggleTheme}>
                <ThemeIcon theme={theme}/>
              </Button>
              <Button>
                <Icon>
                  <Glyph name="ellipsis-v"/>
                </Icon>
              </Button>
            </Buttons>
          </NavBar.Menu.End.Item>
        </NavBar.Menu.End>
      </NavBar.Menu>
    </NavBar>
  );
};
