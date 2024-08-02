import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';
import { NotificationVariant } from './types';

interface StyledDivProps {
  theme: Theme;
  className?: string;
  variant?: NotificationVariant;
  light?: boolean;
}

export const StyledDiv = styled.div.attrs((props: StyledDivProps) => ({
  className: clsx('notification', props.className, {
    'is-primary': props.variant === 'primary',
    'is-link': props.variant === 'link',
    'is-info': props.variant === 'info',
    'is-success': props.variant === 'success',
    'is-warning': props.variant === 'warning',
    'is-danger': props.variant === 'danger',
    'is-light': props.light
  }),
  'data-theme': props.theme
}))``;
