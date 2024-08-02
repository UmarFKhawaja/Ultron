import { PropsWithChildren } from 'react';
import { NotificationVariant } from './types';

export interface NotificationProps extends PropsWithChildren {
  className?: string;
  variant?: NotificationVariant;
  light?: boolean;
}
