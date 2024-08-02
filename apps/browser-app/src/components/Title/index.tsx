import { FC } from 'react';
import { useTheme } from '../../providers';
import { TitleProps } from './props';
import { StyledH1, StyledH2, StyledH3, StyledH4, StyledH5, StyledH6 } from './styles';

export const Title: FC<TitleProps> = ({ size, children, ...props }: TitleProps) => {
  const { theme } = useTheme();

  switch (size) {
    case 1:
      return (
        <StyledH1 theme={theme} {...props}>
          {children}
        </StyledH1>
      );

    case 2:
      return (
        <StyledH2 theme={theme} {...props}>
          {children}
        </StyledH2>
      );

    case 3:
      return (
        <StyledH3 theme={theme} {...props}>
          {children}
        </StyledH3>
      );

    case 4:
      return (
        <StyledH4 theme={theme} {...props}>
          {children}
        </StyledH4>
      );

    case 5:
      return (
        <StyledH5 theme={theme} {...props}>
          {children}
        </StyledH5>
      );

    case 6:
      return (
        <StyledH6 theme={theme} {...props}>
          {children}
        </StyledH6>
      );

    default:
      return children;
  }
};
