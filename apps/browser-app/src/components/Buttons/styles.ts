import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';
import { ButtonsSize } from './types';

interface StyledDivProps {
  theme: Theme;
  className?: string;
  size?: ButtonsSize;
}

export const StyledDiv = styled.div.attrs((props: StyledDivProps) => ({
  className: clsx('buttons', props.className, {
    'are-small': props.size === 'small',
    'are-medium': props.size === 'medium',
    'are-large': props.size === 'large'
  }),
  'data-theme': props.theme
}))``;
