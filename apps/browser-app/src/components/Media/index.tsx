import { FC } from 'react';
import { useTheme } from '../../providers';
import { MediaContent, MediaLeft } from './components';
import { MediaProps } from './props';
import { StyledArticle } from './styles';

interface MediaSubcomponents {
  Left: typeof MediaLeft;
  Content: typeof MediaContent;
}

export const Media: FC<MediaProps> & MediaSubcomponents = ({ children, ...props }: MediaProps) => {
  const { theme } = useTheme();

  return (
    <StyledArticle theme={theme} {...props}>
      {children}
    </StyledArticle>
  );
};

Media.Left = MediaLeft;

Media.Content = MediaContent;
