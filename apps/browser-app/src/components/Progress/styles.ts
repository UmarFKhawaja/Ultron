import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';
import { ProgressSize, ProgressVariant } from './types';

interface StyledProgressProps {
  theme: Theme;
  className?: string;
  variant?: ProgressVariant;
  size?: ProgressSize;
}

export const StyledProgress = styled.progress.attrs((props: StyledProgressProps) => ({
  className: clsx('progress', props.className, {
    'is-primary': props.variant === 'primary',
    'is-link': props.variant === 'link',
    'is-info': props.variant === 'info',
    'is-success': props.variant === 'success',
    'is-warning': props.variant === 'warning',
    'is-danger': props.variant === 'danger',
    'is-small': props.size === 'small',
    'is-normal': props.size === 'normal',
    'is-medium': props.size === 'medium',
    'is-large': props.size === 'large'
  }),
  'data-theme': props.theme
}))``;
