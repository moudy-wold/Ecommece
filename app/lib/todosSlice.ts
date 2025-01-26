import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    islogendRedux: false,
  },
  reducers: {
    setIsLogend: (state) => { 
      state.islogendRedux = !state.islogendRedux;
    },
  },
});

export const { setIsLogend } = counterSlice.actions;

export default counterSlice.reducer;
