import { FC } from 'react';
import { useTheme } from '../../providers';
import { LevelItem, LevelLeft, LevelRight } from './components';
import { LevelProps } from './props';
import { StyledNav } from './styles';

interface LevelSubcomponents {
  Left: typeof LevelLeft;
  Right: typeof LevelRight;
  Item: typeof LevelItem;
}

export const Level: FC<LevelProps> & LevelSubcomponents = ({ children, ...props }: LevelProps) => {
  const { theme } = useTheme();

  return (
    <StyledNav theme={theme} {...props}>
      {children}
    </StyledNav>
  );
};

Level.Left = LevelLeft;

Level.Right = LevelRight;

Level.Item = LevelItem;
