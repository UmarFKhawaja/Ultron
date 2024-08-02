import clsx from 'clsx';
import styled from 'styled-components';

interface StyledAnchorProps {
  target: string;
}

export const StyledAnchor = styled.a.attrs((props: StyledAnchorProps) => ({
  className: clsx('navbar-burger'),
  role: 'button',
  'aria-label': 'menu',
  'aria-expanded': false,
  'data-target': props.target
}))``;

interface StyledSpanProps {
}

export const StyledSpan = styled.span.attrs((props: StyledSpanProps) => ({
  'aria-hidden': true
}))`
  color: black;
`;
