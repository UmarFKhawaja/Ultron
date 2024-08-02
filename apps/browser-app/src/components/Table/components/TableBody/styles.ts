import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../../../types';

interface StyledTBodyProps {
  theme: Theme;
  className?: string;
}

export const StyledTBody = styled.tbody.attrs((props: StyledTBodyProps) => ({
  className: clsx(props.className),
  'data-theme': props.theme
}))``;
