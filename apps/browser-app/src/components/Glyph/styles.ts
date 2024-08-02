import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';
import { GlyphName } from './types';

interface StyledIProps {
  theme: Theme;
  className?: string;
  name: GlyphName;
}

export const StyledI = styled.i.attrs((props: StyledIProps) => ({
  className: clsx('fa', `fa-${props.name}`, props.className),
  'data-theme': props.theme
}))``;
