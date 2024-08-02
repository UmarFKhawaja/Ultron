import { FC } from 'react'
import { useTheme } from '../../providers';
import { IconProps } from './props';
import { StyledSpan } from './styles';

export const Icon: FC<IconProps> = ({ children, ...props }: IconProps) => {
  const { theme } = useTheme();

  return (
    <StyledSpan theme={theme} {...props}>
      {children}
    </StyledSpan>
  );
};
