import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';
import { TagColor, TagSize, TagVariant } from './types';

interface StyledSpanProps {
  theme: Theme;
  className?: string;
  color?: TagColor;
  size?: TagSize;
  variant?: TagVariant;
  light?: boolean;
  hoverable?: boolean;
  rounded?: boolean;
  delete?: boolean;
}

export const StyledSpan = styled.span.attrs((props: StyledSpanProps) => ({
  className: clsx('tag', props.className, {
    'is-white': props.color === 'white',
    'is-black': props.color === 'black',
    'is-light': props.color === 'light' || props.light,
    'is-dark': props.color === 'dark',
    'is-normal': props.size === 'normal',
    'is-medium': props.size === 'medium',
    'is-large': props.size === 'large',
    'is-primary': props.variant === 'primary',
    'is-link': props.variant === 'link',
    'is-info': props.variant === 'info',
    'is-success': props.variant === 'success',
    'is-warning': props.variant === 'warning',
    'is-danger': props.variant === 'danger',
    'is-hoverable': props.hoverable,
    'is-rounded': props.rounded,
    'is-delete': props.delete
  }),
  'data-theme': props.theme
}))``;
