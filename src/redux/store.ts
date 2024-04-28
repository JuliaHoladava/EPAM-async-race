import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './reducers/navigationSlice';

const store = configureStore({
  reducer: navigationReducer,
});

export default store;
