import { DEFAULT_SESSION, Session } from '@ultron/common-library';
import { FC, useCallback, useContext, useMemo, useReducer } from 'react';
import { SessionContext } from './contexts';
import { reduce } from './methods';
import { SessionProviderProps } from './props';
import { SessionValue } from './types';

export const SessionProvider: FC<SessionProviderProps> = ({ children, ...props }: SessionProviderProps) => {
  const [state, dispatch] = useReducer(reduce, {
    session: DEFAULT_SESSION
  });

  const updateSession = useCallback((session: Session): void => {
    dispatch({
      type: 'UPDATE_SESSION',
      session
    });
  }, [dispatch]);

  const invalidateSession = useCallback((): void => {
    dispatch({
      type: 'INVALIDATE_SESSION'
    });
  }, [dispatch]);

  const value: SessionValue = useMemo((): SessionValue => ({
    ...state,
    updateSession,
    invalidateSession
  }), [state, updateSession, invalidateSession]);

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

export function useSession(): SessionValue {
  return useContext<SessionValue>(SessionContext);
}
