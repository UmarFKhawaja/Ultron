import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';
import { NavBarVariant } from './types';

interface StyledNavProps {
  theme: Theme;
  className?: string;
  transparent?: boolean;
  variant?: NavBarVariant;
}

export const StyledNav = styled.nav.attrs((props: StyledNavProps) => ({
  className: clsx('navbar', props.className, {
    'is-transparent': props.transparent,
    'is-fixed-top': props.variant === 'fixed-top',
    'is-fixed-bottom': props.variant === 'fixed-bottom'
  }),
  role: 'navigation',
  'aria-label': 'main-navigation',
  'data-theme': props.theme
}))``;
