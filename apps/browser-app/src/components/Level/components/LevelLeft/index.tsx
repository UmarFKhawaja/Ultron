import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { LevelLeftProps } from './props';
import { StyledDiv } from './styles';

export const LevelLeft: FC<LevelLeftProps> = ({ children, ...props }: LevelLeftProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
