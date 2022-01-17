import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	pathName: null,
};

export const urlSlice = createSlice({
	name: 'url',
	initialState,
	reducers: {
		setUrl: (state, action) => {
			state.pathName = action.payload;
		},
	},
});

export const { setUrl } = urlSlice.actions;

export default urlSlice.reducer;
