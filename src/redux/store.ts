import { configureStore } from '@reduxjs/toolkit';
import navigationSlice from './reducers/navigationSlice';
import carDetailsSlice from './reducers/carDetailsSlice';

const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    car: carDetailsSlice,
  },
});

export default store;
