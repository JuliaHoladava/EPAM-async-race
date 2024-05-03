import { configureStore } from '@reduxjs/toolkit';
import navigationSlice from './reducers/navigationSlice';
import carDetailsSlice from './reducers/carDetailsSlice';
import paginationSlice from './reducers/paginationSlice';

const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    car: carDetailsSlice,
    pagination: paginationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
