import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { TableHeadProps } from './props';
import { StyledTHead } from './styles';

export const TableHead: FC<TableHeadProps> = ({ children, ...props }: TableHeadProps) => {
  const { theme } = useTheme();

  return (
    <StyledTHead theme={theme} {...props}>
      {children}
    </StyledTHead>
  );
};
