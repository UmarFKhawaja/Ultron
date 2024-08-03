import { FC } from 'react';
import { NavBarBrandProps } from './props';
import { StyledDiv } from './styles';

export const NavBarBrand: FC<NavBarBrandProps> = ({ children, ...props }: NavBarBrandProps) => {
  return (
    <StyledDiv {...props}>
      {children}
    </StyledDiv>
  );
};
