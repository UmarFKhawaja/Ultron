import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';

interface StyledNavProps {
  theme: Theme;
  className?: string;
  mobile?: boolean;
}

export const StyledNav = styled.nav.attrs((props: StyledNavProps) => ({
  className: clsx('level', props.className, {
    'is-mobile': props.mobile
  }),
  'data-theme': props.theme
}))``;

