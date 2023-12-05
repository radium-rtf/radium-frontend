import { emptyApi } from '@/shared';

export const courseCreateApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation<{ id: string }, void>({
      query: () => ({
        url: '/course',
        method: 'POST',
        body: {},
      }),
      invalidatesTags: (res) =>
        res
          ? [
              { type: 'courses', id: res.id },
              { type: 'courses', id: 'LIST' },
            ]
          : [{ type: 'courses', id: 'LIST' }],
    }),
  }),
});

export const { useCreateCourseMutation } = courseCreateApi;
