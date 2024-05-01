import { createSlice } from '@reduxjs/toolkit';
import { CarDetails } from '../types';
import { PropsCar } from '../../types/interfaces';

interface CarState {
  carDetails: CarDetails | null;
  cars: PropsCar[];
}

const initialState: CarState = {
  carDetails: null,
  cars: [],
};

const carDetailsSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCarDetails: (state, action: { payload: CarDetails }) => {
      state.carDetails = action.payload;
    },
    setCars: (state, action: { payload: PropsCar[] }) => {
      state.cars = action.payload;
    },
    addCar: (state, action: { payload: PropsCar }) => {
      state.cars.push(action.payload);
    },
  },
});

export const { setCarDetails, setCars, addCar } = carDetailsSlice.actions;
export default carDetailsSlice.reducer;
