import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { MediaLeftProps } from './props';
import { StyledFigure } from './styles';

export const MediaLeft: FC<MediaLeftProps> = ({ children, ...props }: MediaLeftProps) => {
  const { theme } = useTheme();

  return (
    <StyledFigure theme={theme} {...props}>
      {children}
    </StyledFigure>
  );
};
