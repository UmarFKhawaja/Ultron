import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../../../types';

interface StyledDivProps {
  theme: Theme;
  className?: string;
}

export const StyledDiv = styled.div.attrs((props: StyledDivProps) => ({
  className: clsx('level-left', props.className),
  'data-theme': props.theme
}))``;
