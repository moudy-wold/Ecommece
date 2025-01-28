import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  _id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  details: {};
  image: string;
}

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    cart: [] as CartItem[],
  },
  reducers: {
    setCart: (state, action) => {
      const existingItem = state.cart.find(
        (item:CartItem) =>
          item._id === action.payload._id &&
          JSON.stringify(item.details) === JSON.stringify(action.payload.details)
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
    },
    
    deleteItemFromCart: (state, action) => {
      state.cart = state.cart.filter((item:CartItem) => {
          return item._id !== action.payload._id || JSON.stringify(item.details) !== JSON.stringify(action.payload.details);
      });
  },
  
    increaseQuantity: (state, action) => {
      const item = state.cart.find(
        (item:CartItem) =>
          item._id === action.payload._id &&
          JSON.stringify(item.details) === JSON.stringify(action.payload.details)
      );
      console.log(action.payload)
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find(
        (item:CartItem) =>
          item._id === action.payload._id &&
          JSON.stringify(item.details) === JSON.stringify(action.payload.details)
      );
      if (item) {
        item.quantity -= 1;
      }
    },
  },
});

export const {  setCart, deleteItemFromCart,decreaseQuantity,increaseQuantity } =
  counterSlice.actions;

export default counterSlice.reducer;
