import { FC } from 'react';
import { useTheme } from '../../providers';
import { DeleteProps } from './props';
import { StyledButton } from './styles';

export const Delete: FC<DeleteProps> = ({ children, ...props }: DeleteProps) => {
  const { theme } = useTheme();

  return (
    <StyledButton theme={theme} {...props}>
      {children}
    </StyledButton>
  );
};
