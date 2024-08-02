import { FC } from 'react';
import { useTheme } from '../../../../providers';
import { MediaContentProps } from './props';
import { StyledDiv } from './styles';

export const MediaContent: FC<MediaContentProps> = ({ children, ...props }: MediaContentProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
