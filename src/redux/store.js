import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import { tasksApi } from './tasksApi';
import authReducer from './authSlice';
import urlReducer from './urlSlice';

export const store = configureStore({
	reducer: {
		[tasksApi.reducerPath]: tasksApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		auth: authReducer,
		url: urlReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(tasksApi.middleware)
			.concat(authApi.middleware),
});
