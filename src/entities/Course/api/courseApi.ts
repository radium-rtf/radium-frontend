import { emptyApi } from '@/shared';
import { CourseResponseDto } from '..';

const courseApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    course: builder.query<CourseResponseDto, string>({
      query: (slug) => ({
        url: `/course/slug/${slug}`,
      }),
      providesTags: (result) =>
        result
          ? [{ type: 'courses' as const, id: result.slug }, 'courses']
          : ['courses'],
    }),
  }),
});

export const { useCourseQuery, useLazyCourseQuery } = courseApi;