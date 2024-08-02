import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';

interface StyledNavProps {
  theme: Theme;
  className?: string;
}

export const StyledNav = styled.nav.attrs((props: StyledNavProps) => ({
  className: clsx('navbar', props.className),
  role: 'navigation',
  'aria-label': 'main-navigation',
  'data-theme': props.theme
}))``;
