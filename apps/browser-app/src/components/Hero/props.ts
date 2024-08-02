import { PropsWithChildren } from 'react';
import { HeroSize, HeroVariant } from './types';

export interface HeroProps extends PropsWithChildren {
  className?: string;
  withNavBar?: boolean;
  size?: HeroSize;
  variant?: HeroVariant;
}
