import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { LevelRightProps } from './props';
import { StyledDiv } from './styles';

export const LevelRight: FC<LevelRightProps> = ({ children, ...props }: LevelRightProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
