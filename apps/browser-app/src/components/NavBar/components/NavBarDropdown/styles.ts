import clsx from 'clsx';
import styled from 'styled-components';

interface StyledOuterDivProps {
  className?: string;
}

export const StyledOuterDiv = styled.div.attrs((props: StyledOuterDivProps) => ({
  className: clsx('navbar-item', 'has-dropdown', 'is-hoverable', props.className)
}))``;

interface StyledAnchorProps {
}

export const StyledAnchor = styled.a.attrs((props: StyledAnchorProps) => ({
  className: clsx('navbar-link')
}))``;

interface StyledInnerDivProps {
}

export const StyledInnerDiv = styled.div.attrs((props: StyledInnerDivProps) => ({
  className: clsx('navbar-dropdown')
}))``;
