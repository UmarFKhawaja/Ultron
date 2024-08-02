import clsx from 'clsx';
import styled from 'styled-components';
import { Theme } from '../../types';

interface StyledArticleProps {
  theme: Theme;
  className?: string;
}

export const StyledArticle = styled.article.attrs((props: StyledArticleProps) => ({
  className: clsx('media', props.className),
  'data-theme': props.theme
}))``;
