import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';

interface StyledDivProps {
  theme: Theme;
  className?: string;
  hasAddons?: boolean;
}

export const StyledDiv = styled.div.attrs((props: StyledDivProps) => ({
  className: clsx('tags', props.className, {
    'has-addons': props.hasAddons
  }),
  'data-theme': props.theme
}))``;
