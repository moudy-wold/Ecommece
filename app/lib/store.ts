import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './todosSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;

export type AppDispatch = typeof store.dispatch;
