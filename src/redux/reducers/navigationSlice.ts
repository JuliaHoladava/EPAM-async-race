import { createSlice } from '@reduxjs/toolkit';
import { TabName } from '../types';

interface ActiveTabState {
  activeTab: TabName;
}

const initialState: ActiveTabState = {
  activeTab: 'garage',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveTab: (state, action: { payload: TabName }) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = navigationSlice.actions;
export default navigationSlice.reducer;
