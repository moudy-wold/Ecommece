import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
   admin:false,
  },
  reducers: {
    
  },
   
});

export const {
  
} = counterSlice.actions;

export default counterSlice.reducer;
