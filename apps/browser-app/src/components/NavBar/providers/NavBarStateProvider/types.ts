export interface NavBarStateState {
  active: boolean;
}

export interface NavBarStateToggleActiveAction {
  type: 'TOGGLE_ACTIVE';
}

export type NavBarStateAction =
  | NavBarStateToggleActiveAction;

export interface NavBarStateValue extends NavBarStateState {
  toggleActive: () => void;
}
