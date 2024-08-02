import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../../../types';
import { TableRowColor } from './types';

interface StyledTRProps {
  theme: Theme;
  className?: string;
  color?: TableRowColor;
  selected?: boolean;
}

export const StyledTR = styled.tr.attrs((props: StyledTRProps) => ({
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
    'is-white': props.color === 'white',
    'is-selected': props.selected
  }),
  'data-theme': props.theme
}))``;
