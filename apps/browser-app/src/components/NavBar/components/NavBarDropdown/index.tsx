import { FC } from 'react';
import { NavBarDropdownProps } from './props';
import { StyledAnchor, StyledInnerDiv, StyledOuterDiv } from './styles';

export const NavBarDropdown: FC<NavBarDropdownProps> = ({ text, children, ...props }: NavBarDropdownProps) => (
  <StyledOuterDiv {...props}>
    <StyledAnchor>
      {text}
    </StyledAnchor>
    <StyledInnerDiv>
      {children}
    </StyledInnerDiv>
  </StyledOuterDiv>
);
