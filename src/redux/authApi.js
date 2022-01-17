import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://uxcandy.com/~shapoval/test-task-backend/v2/',
	}),
	endpoints: build => ({
		login: build.mutation({
			query: body => ({
				url: `login?developer=necelentano`,
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useLoginMutation } = authApi;
