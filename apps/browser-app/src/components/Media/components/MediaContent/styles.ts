import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../../../types';

interface StyledDivProps {
  theme: Theme;
  className?: string;
}

export const StyledDiv = styled.div.attrs((props: StyledDivProps) => ({
  className: clsx('media-content', props.theme),
  'data-theme': props.theme
}))``;
