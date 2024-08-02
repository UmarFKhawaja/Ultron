import { FC } from 'react';
import { useTheme } from '../../providers';
import { ImageProps } from './props';
import { StyledFigure } from './styles';

export const Image: FC<ImageProps> = ({ children, ...props }: ImageProps) => {
  const { theme } = useTheme();

  return (
    <StyledFigure theme={theme} {...props}>
      {children}
    </StyledFigure>
  );
};
