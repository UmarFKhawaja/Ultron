import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { HeroBodyProps } from './props';
import { StyledDiv } from './styles';

export const HeroBody: FC<HeroBodyProps> = ({ children, ...props }: HeroBodyProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
