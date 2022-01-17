import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
	reducerPath: 'tasksApi',
	tagTypes: ['Tasks'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://uxcandy.com/~shapoval/test-task-backend/v2/',
	}),
	endpoints: build => ({
		getAllTasks: build.query({
			query: params => {
				let requestParams = {
					developer: 'necelentano',
					page: params.page,
				};

				if (params.sortField) requestParams.sort_field = params.sortField;
				if (params.sortDirection)
					requestParams.sort_direction = params.sortDirection;
				return {
					url: '',
					method: 'GET',
					params: requestParams,
				};
			},
			providesTags: result => {
				return result.message.tasks
					? [
							...result.message.tasks.map(({ id }) => ({ type: 'Tasks', id })),
							{ type: 'Tasks', id: 'LIST' },
					  ]
					: [{ type: 'Tasks', id: 'LIST' }];
			},
		}),
		addTask: build.mutation({
			query: body => {
				return {
					url: `create?developer=necelentano`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
		}),
		editTask: build.mutation({
			query: body => {
				let requestParams = {
					developer: 'necelentano',
					id: body.id,
				};
				return {
					url: `edit/${body.id}`,
					method: 'POST',
					params: requestParams,
					body: body.editedTaskData,
				};
			},
			invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
		}),
	}),
});

export const { useGetAllTasksQuery, useAddTaskMutation, useEditTaskMutation } =
	tasksApi;
