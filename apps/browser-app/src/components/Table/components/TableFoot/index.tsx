import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { TableFootProps } from './props';
import { StyledTFoot } from './styles';

export const TableFoot: FC<TableFootProps> = ({ children, ...props }: TableFootProps) => {
  const { theme } = useTheme();

  return (
    <StyledTFoot theme={theme} {...props}>
      {children}
    </StyledTFoot>
  );
};
