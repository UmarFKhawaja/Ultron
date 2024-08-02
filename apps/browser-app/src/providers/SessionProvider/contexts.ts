import { DEFAULT_SESSION } from '@ultron/common-library';
import { Context, createContext } from 'react';
import { SessionValue } from './types';

export const SessionContext: Context<SessionValue> = createContext<SessionValue>({
  session: DEFAULT_SESSION,
  updateSession: (): void => {
  },
  invalidateSession: (): void => {
  }
});
