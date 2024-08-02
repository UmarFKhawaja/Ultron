import { FC } from 'react';
import { useTheme } from '../../providers';
import { ContentProps } from './props';
import { StyledDiv } from './styles';

export const Content: FC<ContentProps> = ({ children, ...props }: ContentProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
