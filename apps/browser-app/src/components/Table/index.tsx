import { FC } from 'react';
import { useTheme } from '../../providers';
import { TableBody, TableCell, TableFoot, TableHead, TableHeading, TableRow } from './components';
import { TableProps } from './props';
import { StyledTable, StyledTableContainer } from './styles';

interface TableSubcomponents {
  Head: typeof TableHead;
  Body: typeof TableBody;
  Foot: typeof TableFoot;
  Row: typeof TableRow;
  Heading: typeof TableHeading;
  Cell: typeof TableCell;
}

export const Table: FC<TableProps> & TableSubcomponents = ({ scrollable, children, ...props }: TableProps) => {
  const { theme } = useTheme();

  if (scrollable) {
    return (
      <StyledTableContainer>
        <StyledTable theme={theme} {...props}>
          {children}
        </StyledTable>
      </StyledTableContainer>
    );
  }

  return (
    <StyledTable theme={theme} {...props}>
      {children}
    </StyledTable>
  );
};

Table.Head = TableHead;

Table.Body = TableBody;

Table.Foot = TableFoot;

Table.Row = TableRow;

Table.Heading = TableHeading;

Table.Cell = TableCell;
