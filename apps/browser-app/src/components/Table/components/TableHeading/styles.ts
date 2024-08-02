import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../../../types';
import { TableHeadingColor } from './types';

interface StyledTHProps {
  theme: Theme;
  className?: string;
  color?: TableHeadingColor;
}

export const StyledTH = styled.th.attrs((props: StyledTHProps) => ({
  className: clsx(props.className, {
    'is-primary': props.color === 'primary',
    'is-link': props.color === 'link',
    'is-info': props.color === 'info',
    'is-success': props.color === 'success',
    'is-warning': props.color === 'warning',
    'is-danger': props.color === 'danger',
    'is-black': props.color === 'black',
    'is-dark': props.color === 'dark',
    'is-light': props.color === 'light',
    'is-white': props.color === 'white'
  }),
  'data-theme': props.theme
}))``;
