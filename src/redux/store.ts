import { configureStore } from '@reduxjs/toolkit';
import navigationSlice from './reducers/navigationSlice';
import carDetailsSlice from './reducers/carDetailsSlice';
import paginationSlice from './reducers/paginationSlice';
import winnerSlice from './reducers/winnerSlice';

const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    car: carDetailsSlice,
    pagination: paginationSlice,
    winner: winnerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
