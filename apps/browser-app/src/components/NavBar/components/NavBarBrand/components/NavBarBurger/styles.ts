import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../../../../../types';

interface StyledAnchorProps {
  theme: Theme;
  target: string;
  active: boolean;
  onClick: () => void;
}

export const StyledAnchor = styled.a.attrs((props: StyledAnchorProps) => ({
  className: clsx('navbar-burger', {
    'is-active': props.active
  }),
  role: 'button',
  'aria-label': 'menu',
  'aria-expanded': false,
  'data-target': props.target,
  onClick: props.onClick
}))``;

interface StyledSpanProps {
  theme: Theme;
}

export const StyledSpan = styled.span.attrs((props: StyledSpanProps) => ({
  'aria-hidden': true
}))`
  color: ${(props: StyledSpanProps): string => props.theme === 'light' ? 'black' : 'white'}
`;
