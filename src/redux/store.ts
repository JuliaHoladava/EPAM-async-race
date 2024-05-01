import { configureStore } from '@reduxjs/toolkit';
import navigationSlice from './reducers/navigationSlice';
import carDetailsSlice from './reducers/carDetailsSlice';

const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    car: carDetailsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
