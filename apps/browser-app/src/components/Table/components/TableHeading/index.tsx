import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { TableHeadingProps } from './props';
import { StyledTH } from './styles';

export const TableHeading: FC<TableHeadingProps> = ({ children, ...props }: TableHeadingProps) => {
  const { theme } = useTheme();

  return (
    <StyledTH theme={theme} {...props}>
      {children}
    </StyledTH>
  );
};
