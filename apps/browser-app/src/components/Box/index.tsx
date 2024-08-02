import { FC } from 'react';
import { useTheme } from '../../providers';
import { BoxProps } from './props';
import { StyledDiv } from './styles';

export const Box: FC<BoxProps> = ({ children, ...props }: BoxProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
