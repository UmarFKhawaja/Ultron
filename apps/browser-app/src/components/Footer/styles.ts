import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';

interface StyledFooterProps {
  theme: Theme;
  className?: string;
}

export const StyledFooter = styled.footer.attrs((props: StyledFooterProps) => ({
  className: clsx('footer', props.className),
  'data-theme': props.theme
}))``;
