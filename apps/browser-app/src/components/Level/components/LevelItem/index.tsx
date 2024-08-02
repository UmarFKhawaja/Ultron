import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { LevelItemProps } from './props';
import { StyledDiv } from './styles';

export const LevelItem: FC<LevelItemProps> = ({ children, ...props }: LevelItemProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
