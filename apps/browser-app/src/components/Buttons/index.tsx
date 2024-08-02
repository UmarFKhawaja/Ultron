import { FC } from 'react'
import { useTheme } from '../../providers';
import { ButtonsProps } from './props';
import { StyledDiv } from './styles';

export const Buttons: FC<ButtonsProps> = ({ children, ...props }: ButtonsProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
