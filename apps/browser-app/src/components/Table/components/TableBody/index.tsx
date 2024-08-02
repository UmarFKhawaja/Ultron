import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { TableBodyProps } from './props';
import { StyledTBody } from './styles';

export const TableBody: FC<TableBodyProps> = ({ children, ...props }: TableBodyProps) => {
  const { theme } = useTheme();

  return (
    <StyledTBody theme={theme} {...props}>
      {children}
    </StyledTBody>
  );
};
