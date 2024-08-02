import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../../../types';

interface StyledFigureProps {
  theme: Theme;
  className?: string;
}

export const StyledFigure = styled.figure.attrs((props: StyledFigureProps) => ({
  className: clsx('media-left', props.className),
  'data-theme': props.theme
}))``;
