import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';
import { DeleteSize } from './types';

interface StyledButtonProps {
  theme: Theme;
  className?: string;
  size?: DeleteSize;
  onClick: () => void;
}

export const StyledButton = styled.button.attrs((props: StyledButtonProps) => ({
  className: clsx('delete', props.className, {
    'is-small': props.size === 'small',
    'is-medium': props.size === 'medium',
    'is-large': props.size === 'large'
  }),
  'data-theme': props.theme,
  onClick: props.onClick
}))``;
