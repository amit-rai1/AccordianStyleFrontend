import { configureStore } from '@reduxjs/toolkit';
// import categoryReducer from './categorySlice';
import categoryReducer from '../slice/CategorySlice'

const store = configureStore({
  reducer: {
    category: categoryReducer
  }
});

export default store;
