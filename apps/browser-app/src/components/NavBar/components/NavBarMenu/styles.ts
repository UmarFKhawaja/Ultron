import clsx from 'clsx';
import styled from 'styled-components';

interface StyledDivProps {
  id: string;
  className?: string;
  active: boolean;
}

export const StyledDiv = styled.div.attrs((props: StyledDivProps) => ({
  id: props.id,
  className: clsx('navbar-menu', props.className, {
    'is-active': props.active
  })
}))``;
