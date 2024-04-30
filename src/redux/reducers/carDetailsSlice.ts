import { createSlice } from '@reduxjs/toolkit';
import { CarDetails } from '../types';

interface CarState {
  carDetails: CarDetails | null;
}

const initialState: CarState = {
  carDetails: null,
};

const carDetailsSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCarDetails: (state, action: { payload: CarDetails }) => {
      state.carDetails = action.payload;
    },
  },
});

export const { setCarDetails } = carDetailsSlice.actions;
export default carDetailsSlice.reducer;
