import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
// import contentReducer from './content/contentSlice';
// import transactionReducer from './transaction/transactionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // content: contentReducer,
    // transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
