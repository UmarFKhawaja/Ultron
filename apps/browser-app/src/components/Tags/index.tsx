import { FC } from 'react';
import { useTheme } from '../../providers';
import { TagsProps } from './props';
import { StyledDiv } from './styles';

export const Tags: FC<TagsProps> = ({ children, ...props }: TagsProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
