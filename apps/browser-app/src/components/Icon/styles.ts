import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';

interface StyledSpanProps {
  theme: Theme;
  className?: string;
}

export const StyledSpan = styled.span.attrs((props: StyledSpanProps) => ({
  className: clsx('icon', props.className),
  'data-theme': props.theme
}))``;
