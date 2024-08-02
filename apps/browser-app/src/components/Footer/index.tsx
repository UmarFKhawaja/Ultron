import { FC } from 'react';
import { useTheme } from '../../providers';
import { FooterProps } from './props';
import { StyledFooter } from './styles';

export const Footer: FC<FooterProps> = ({ children, ...props }: FooterProps) => {
  const { theme } = useTheme();

  return (
    <StyledFooter theme={theme} {...props}>
      {children}
    </StyledFooter>
  );
};
