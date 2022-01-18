import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import { tasksApi } from './tasksApi';
import authReducer from './authSlice';
import urlReducer from './urlSlice';

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const rootReducer = combineReducers({
	[tasksApi.reducerPath]: tasksApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	auth: authReducer,
	url: urlReducer,
});

export const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.concat(tasksApi.middleware)
			.concat(authApi.middleware),
});

export const persistor = persistStore(store);
