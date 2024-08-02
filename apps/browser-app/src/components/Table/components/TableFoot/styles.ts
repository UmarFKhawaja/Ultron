import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../../../types';

interface StyledTFootProps {
  theme: Theme;
  className?: string;
}

export const StyledTFoot = styled.tfoot.attrs((props: StyledTFootProps) => ({
  className: clsx(props.className),
  'data-theme': props.theme
}))``;
