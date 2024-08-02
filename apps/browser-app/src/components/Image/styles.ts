import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';
import { ImageSize } from './types';

interface StyledFigureProps {
  theme: Theme;
  className?: string;
  rounded?: boolean;
  retina?: boolean;
  size?: ImageSize;
  fullWidth?: boolean;
}

export const StyledFigure = styled.figure.attrs((props: StyledFigureProps) => ({
  className: clsx('image', props.className, {
    'is-16x16': props.size === 16,
    'is-24x24': props.size === 24,
    'is-32x32': props.size === 32,
    'is-48x48': props.size === 48,
    'is-64x64': props.size === 64,
    'is-96x96': props.size === 96,
    'is-128x128': props.size === 128,
    'is-square': props.size === 'square',
    'is-1by1': props.size === '1by1',
    'is-5by4': props.size === '5by4',
    'is-4by5': props.size === '4by5',
    'is-4by3': props.size === '4by3',
    'is-3by4': props.size === '3by4',
    'is-3by2': props.size === '3by2',
    'is-2by3': props.size === '2by3',
    'is-5by3': props.size === '5by3',
    'is-3by5': props.size === '3by5',
    'is-16by9': props.size === '16by9',
    'is-9by16': props.size === '9by16',
    'is-2by1': props.size === '2by1',
    'is-1by2': props.size === '1by2',
    'is-3by1': props.size === '3by1',
    'is-1by3': props.size === '1by3',
    'is-rounded': props.rounded,
    'is-retina': props.retina,
    'is-fullwidth': props.fullWidth
  }),
  'data-theme': props.theme
}))``;
