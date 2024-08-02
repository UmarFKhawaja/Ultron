import { FC } from 'react';
import { useTheme } from '../../providers';
import { ContainerProps } from './props';
import { StyledDiv } from './styles';

export const Container: FC<ContainerProps> = ({ children, ...props }: ContainerProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
