import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../../../types';

interface StyledTHeadProps {
  theme: Theme;
  className?: string;
}

export const StyledTHead = styled.thead.attrs((props: StyledTHeadProps) => ({
  className: clsx(props.className),
  'data-theme': props.theme
}))``;
