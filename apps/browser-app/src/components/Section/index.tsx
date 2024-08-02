import { FC } from 'react';
import { useTheme } from '../../providers';
import { SectionProps } from './props';
import { StyledSection } from './styles';

export const Section: FC<SectionProps> = ({ children, ...props }: SectionProps) => {
  const { theme } = useTheme();

  return (
    <StyledSection theme={theme} {...props}>
      {children}
    </StyledSection>
  );
};
