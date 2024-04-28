export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

export type TabName = 'garage' | 'winners';

export interface SetActiveTabAction {
  type: typeof SET_ACTIVE_TAB;
  payload: TabName;
}
