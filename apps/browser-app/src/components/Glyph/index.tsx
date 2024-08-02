import { FC } from 'react'
import { useTheme } from '../../providers';
import { GlyphProps } from './props';
import { StyledI } from './styles';

export const Glyph: FC<GlyphProps> = ({ ...props }: GlyphProps) => {
  const { theme } = useTheme();

  return (
    <StyledI theme={theme} {...props}></StyledI>
  );
};
