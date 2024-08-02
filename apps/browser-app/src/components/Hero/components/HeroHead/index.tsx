import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { HeroHeadProps } from './props';
import { StyledDiv } from './styles';

export const HeroHead: FC<HeroHeadProps> = ({ children, ...props }: HeroHeadProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
