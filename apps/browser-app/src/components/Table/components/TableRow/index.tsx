import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { TableRowProps } from './props';
import { StyledTR } from './styles';

export const TableRow: FC<TableRowProps> = ({ children, ...props }: TableRowProps) => {
  const { theme } = useTheme();

  return (
    <StyledTR theme={theme} {...props}>
      {children}
    </StyledTR>
  );
};
