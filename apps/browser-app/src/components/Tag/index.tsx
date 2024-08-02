import { FC } from 'react';
import { useTheme } from '../../providers';
import { TagProps } from './props';
import { StyledSpan } from './styles';

export const Tag: FC<TagProps> = ({ children, ...props }: TagProps) => {
  const { theme } = useTheme();

  return (
    <StyledSpan theme={theme} {...props}>
      {children}
    </StyledSpan>
  );
};
