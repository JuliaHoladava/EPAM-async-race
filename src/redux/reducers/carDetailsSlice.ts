import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CarDetails } from '../types';
import { PropsCar } from '../../types/interfaces';

interface CarState {
  carDetails: CarDetails | null;
  cars: PropsCar[];
  editingCar: CarDetails | null;
}

const initialState: CarState = {
  carDetails: null,
  cars: [],
  editingCar: null,
};

const NOT_FOUND_INDEX = -1;

const carDetailsSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCars: (state, action: { payload: PropsCar[] }) => {
      state.cars = action.payload;
    },
    addCar: (state, action: { payload: PropsCar }) => {
      state.cars.push(action.payload);
    },
    removeCar: (state, action: PayloadAction<number>) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
    },
    updateCar: (state, action: { payload: PropsCar }) => {
      const index = state.cars.findIndex((car) => car.id === action.payload.id);
      if (index !== NOT_FOUND_INDEX) {
        state.cars[index] = action.payload;
      }
    },
    setEditingCar: (state, action) => {
      state.editingCar = action.payload;
    },
  },
});

export const { setCars, addCar, removeCar, updateCar, setEditingCar } =
  carDetailsSlice.actions;
export default carDetailsSlice.reducer;
