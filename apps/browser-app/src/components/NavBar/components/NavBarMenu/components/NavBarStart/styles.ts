import clsx from 'clsx';
import styled from 'styled-components';

interface StyledDivProps {
  className?: string;
}

export const StyledDiv = styled.div.attrs((props: StyledDivProps) => ({
  className: clsx('navbar-start', props.className)
}))``;
