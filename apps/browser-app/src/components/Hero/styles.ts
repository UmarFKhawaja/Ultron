import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';
import { HeroSize, HeroVariant } from './types';

interface StyledSectionProps {
  theme: Theme;
  className?: string;
  withNavBar?: boolean;
  size?: HeroSize;
  variant?: HeroVariant;
}

export const StyledSection = styled.section.attrs((props: StyledSectionProps) => ({
  className: clsx('hero', props.className, {
    'is-fullheight-with-navbar': props.withNavBar,
    'is-small': props.size === 'small',
    'is-medium': props.size === 'medium',
    'is-large': props.size === 'large',
    'is-halfheight': props.size === 'halfheight',
    'is-fullheight': props.size === 'fullheight',
    'is-primary': props.variant === 'primary',
    'is-link': props.variant === 'link',
    'is-info': props.variant === 'info',
    'is-success': props.variant === 'success',
    'is-warning': props.variant === 'warning',
    'is-danger': props.variant === 'danger'
  }),
  'data-theme': props.theme
}))``;

