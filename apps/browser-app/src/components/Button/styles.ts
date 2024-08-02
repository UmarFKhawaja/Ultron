import clsx from 'clsx';
import styled from 'styled-components';
import { ButtonColor, ButtonSize, ButtonTheme, ButtonVariant } from './types';

interface StyledProps {
  className?: string;
  color?: ButtonColor;
  size?: ButtonSize;
  theme?: ButtonTheme;
  variant?: ButtonVariant;
}

export const StyledAnchor = styled.a.attrs((props: StyledProps) => ({
  className: deriveClassName(props)
}))``;

export const StyledButton = styled.button.attrs((props: StyledProps) => ({
  className: deriveClassName(props)
}))``;

export const StyledInput = styled.input.attrs((props: StyledProps & { type: 'submit' | 'reset' }) => ({
  className: deriveClassName(props),
  type: props.type
}))``;

function deriveClassName(props: StyledProps): string {
  return clsx('button', props.className, {
    'is-white': props.color === 'white',
    'is-black': props.color === 'black',
    'is-light': props.color === 'light' || props.theme === 'light',
    'is-dark': props.color === 'dark' || props.theme === 'dark',
    'is-text': props.color === 'text',
    'is-ghost': props.color === 'ghost',
    'is-small': props.size === 'small',
    'is-medium': props.size === 'medium',
    'is-large': props.size === 'large',
    'is-primary': props.variant === 'primary',
    'is-link': props.variant === 'link',
    'is-info': props.variant === 'info',
    'is-success': props.variant === 'success',
    'is-warning': props.variant === 'warning',
    'is-danger': props.variant === 'danger'
  });
}
