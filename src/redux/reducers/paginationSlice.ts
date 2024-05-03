import { createSlice } from '@reduxjs/toolkit';

const initialState = { pageNumber: 1 };

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPageNumber: (state, action: { payload: number }) => {
      state.pageNumber = action.payload;
    },
  },
});

export const { setPageNumber } = paginationSlice.actions;
export default paginationSlice.reducer;
