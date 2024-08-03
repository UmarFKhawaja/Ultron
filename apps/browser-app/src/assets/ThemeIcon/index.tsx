import { FC } from 'react';
import { Glyph, Icon } from '../../components';
import { ThemeIconProps } from './props';

export const ThemeIcon: FC<ThemeIconProps> = ({ theme, ...props }: ThemeIconProps) => {
  return (
    <Icon>
      {
        theme === 'light'
          ? <Glyph name="moon-o"/>
          : <Glyph name="sun-o"/>
      }
    </Icon>
  );
};
