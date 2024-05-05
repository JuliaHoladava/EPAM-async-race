import { createSlice } from '@reduxjs/toolkit';
import { PropsWinners } from '../../types/interfaces';

interface WinnerState {
  winners: PropsWinners[];
}

const initialState: WinnerState = {
  winners: [],
};

const winnerSlice = createSlice({
  name: 'winner',
  initialState,
  reducers: {
    setWinners: (state, action: { payload: PropsWinners[] }) => {
      state.winners = action.payload;
    },
  },
});

export const { setWinners } = winnerSlice.actions;
export default winnerSlice.reducer;
