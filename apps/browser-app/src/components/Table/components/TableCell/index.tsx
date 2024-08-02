import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { TableCellProps } from './props';
import { StyledTD } from './styles';

export const TableCell: FC<TableCellProps> = ({ children, ...props }: TableCellProps) => {
  const { theme } = useTheme();

  return (
    <StyledTD theme={theme} {...props}>
      {children}
    </StyledTD>
  );
};
