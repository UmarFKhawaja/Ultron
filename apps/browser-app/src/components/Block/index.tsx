import { FC } from 'react';
import { useTheme } from '../../providers';
import { BlockProps } from './props';
import { StyledDiv } from './styles';

export const Block: FC<BlockProps> = ({ children, ...props }: BlockProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
