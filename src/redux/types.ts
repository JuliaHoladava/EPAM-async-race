export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_CAR_DETAILS = 'SET_CAR_DETAILS';

export type TabName = 'garage' | 'winners';

export interface SetActiveTabAction {
  type: typeof SET_ACTIVE_TAB;
  payload: TabName;
}

export interface CarDetails {
  name: string;
  color: string;
}

export interface SetCarDetailsAction {
  type: typeof SET_CAR_DETAILS;
  payload: CarDetails;
}
