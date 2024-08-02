import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';
import { ContainerSize } from './types';

interface StyleDivProps {
  theme: Theme;
  className?: string;
  fluid?: boolean;
  size?: ContainerSize;
}

export const StyledDiv = styled.div.attrs((props: StyleDivProps) => ({
  className: clsx('container', props.className, {
    'is-fluid': props.fluid,
    'is-widescreen': props.size === 'widescreen',
    'is-fullhd': props.size === 'fullhd',
    'is-max-desktop': props.size === 'max-desktop',
    'is-max-widescreen': props.size === 'max-widescreen'
  }),
  'data-theme': props.theme
}))``;
