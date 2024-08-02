import { Session } from '@ultron/common-library';

export interface SessionState {
  session: Session;
}

export interface SessionUpdateSessionAction {
  type: 'UPDATE_SESSION';
  session: Session;
}

export interface SessionInvalidateSessionAction {
  type: 'INVALIDATE_SESSION';
}

export type SessionAction =
  | SessionUpdateSessionAction
  | SessionInvalidateSessionAction;

export interface SessionValue extends SessionState {
  updateSession: (session: Session) => void;
  invalidateSession: () => void;
}
