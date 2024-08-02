import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { HeroFootProps } from './props';
import { StyledDiv } from './styles';

export const HeroFoot: FC<HeroFootProps> = ({ children, ...props }: HeroFootProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
