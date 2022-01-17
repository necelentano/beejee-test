import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: null,
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
			state.isAuthenticated = true;
		},
		deleteToken: state => {
			state.token = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setToken, deleteToken } = authSlice.actions;

export default authSlice.reducer;
