import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthSlice';
import userReducer from './reducers/UserSlice';

export default configureStore({
  reducer:{
    auth: authReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});