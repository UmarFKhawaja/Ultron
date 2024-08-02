import { ComponentPropsWithoutRef, ElementType } from 'react';
import { ButtonProps } from './props';
import { StyledAnchor, StyledButton, StyledInput } from './styles';

export const Button = <T extends ElementType | 'a' | 'button' | 'input'>({ as, ...props }: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
  if (as === 'a') {
    return <StyledAnchor {...props}/>;
  }

  if (as === 'button') {
    return <StyledButton {...props}/>;
  }

  if (as === 'input') {
    return <StyledInput {...props}/>;
  }

  return <StyledButton {...props}/>;
};
