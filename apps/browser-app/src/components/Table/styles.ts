import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';

interface StyledTableProps {
  theme: Theme;
  className?: string;
  bordered?: boolean;
  striped?: boolean;
  narrow?: boolean;
  hoverable?: boolean;
  fullWidth?: boolean;
}

export const StyledTable = styled.table.attrs((props: StyledTableProps) => ({
  className: clsx('table', props.className, {
    'is-bordered': props.bordered,
    'is-striped': props.striped,
    'is-narrow': props.narrow,
    'is-hoverable': props.hoverable,
    'is-fullwidth': props.fullWidth
  }),
  'data-theme': props.theme
}))``;

export const StyledTableContainer = styled.div.attrs(() => ({
  className: 'table-container'
}))``;
