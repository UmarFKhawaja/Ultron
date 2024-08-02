import { FC } from 'react';
import { useTheme } from '../../providers';
import { NotificationProps } from './props';
import { StyledDiv } from './styles';

export const Notification: FC<NotificationProps> = ({ children, ...props }: NotificationProps) => {
  const { theme } = useTheme();

  return (
    <StyledDiv theme={theme} {...props}>
      {children}
    </StyledDiv>
  );
};
