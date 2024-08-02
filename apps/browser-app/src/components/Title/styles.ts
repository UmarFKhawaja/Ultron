import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';

interface StyledDivProps {
  theme: Theme;
  className?: string;
}

export const StyledH1 = styled.h1.attrs((props: StyledDivProps) => ({
  className: clsx('title', 'is-1', props.className),
  'data-theme': props.theme
}))``;

export const StyledH2 = styled.h2.attrs((props: StyledDivProps) => ({
  className: clsx('title', 'is-2', props.className),
  'data-theme': props.theme
}))``;

export const StyledH3 = styled.h3.attrs((props: StyledDivProps) => ({
  className: clsx('title', 'is-3', props.className),
  'data-theme': props.theme
}))``;

export const StyledH4 = styled.h4.attrs((props: StyledDivProps) => ({
  className: clsx('title', 'is-4', props.className),
  'data-theme': props.theme
}))``;

export const StyledH5 = styled.h5.attrs((props: StyledDivProps) => ({
  className: clsx('title', 'is-5', props.className),
  'data-theme': props.theme
}))``;

export const StyledH6 = styled.h6.attrs((props: StyledDivProps) => ({
  className: clsx('title', 'is-6', props.className),
  'data-theme': props.theme
}))``;
