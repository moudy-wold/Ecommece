import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
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
        (item) =>
          item.id === action.payload.id &&
          item.details === action.payload.details
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
    },
    deleteItemFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseQuantity : (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity -= 1;
      }
    },
  },
});

export const {  setCart, deleteItemFromCart,decreaseQuantity,increaseQuantity } =
  counterSlice.actions;

export default counterSlice.reducer;
