import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';
import { SectionSize } from './types';

interface StyledSectionProps {
  theme: Theme;
  className?: string;
  size?: SectionSize;
}

export const StyledSection = styled.section.attrs((props: StyledSectionProps) => ({
  className: clsx('section', props.className, {
    'is-medium': props.size === 'medium',
    'is-large': props.size === 'large'
  }),
  'data-theme': props.theme
}))``;
