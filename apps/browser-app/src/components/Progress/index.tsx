import { FC } from 'react';
import { useTheme } from '../../providers';
import { ProgressProps } from './props';
import { StyledProgress } from './styles';

export const Progress: FC<ProgressProps> = ({ children, ...props }: ProgressProps) => {
  const { theme } = useTheme();

  return (
    <StyledProgress theme={theme} {...props}>
      {children}
    </StyledProgress>
  );
};
