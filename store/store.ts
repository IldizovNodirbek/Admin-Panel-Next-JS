import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productsSlice from './slices/productsSlice';
import ordersSlice from './slices/ordersSlice';
import usersSlice from './slices/usersSlice';
import blogSlice from './slices/blogSlice';
import categoriesSlice from './slices/categoriesSlice';
import notificationsSlice from './slices/notificationsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'products', 'orders', 'users', 'blog', 'categories', 'notifications'],
};

const rootReducer = combineReducers({
  auth: authSlice,
  products: productsSlice,
  orders: ordersSlice,
  users: usersSlice,
  blog: blogSlice,
  categories: categoriesSlice,
  notifications: notificationsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;