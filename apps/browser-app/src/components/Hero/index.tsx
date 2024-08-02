import { FC } from 'react';
import { useTheme } from '../../providers';
import { HeroBody, HeroFoot, HeroHead } from './components';
import { HeroProps } from './props';
import { StyledSection } from './styles';

interface HeroSubcomponents {
  Head: typeof HeroHead;
  Body: typeof HeroBody;
  Foot: typeof HeroFoot;
}

export const Hero: FC<HeroProps> & HeroSubcomponents = ({ children, ...props }: HeroProps) => {
  const { theme } = useTheme();

  return (
    <StyledSection theme={theme} {...props}>
      {children}
    </StyledSection>
  );
};

Hero.Head = HeroHead;

Hero.Body = HeroBody;

Hero.Foot = HeroFoot;
