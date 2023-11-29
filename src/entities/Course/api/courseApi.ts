import { emptyApi } from '@/shared';
import { CourseResponseDto } from '../model/courseResponseDto';

const courseApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    course: builder.query<CourseResponseDto, string>({
      query: (slug) => ({
        url: `/course/${slug}`,
      }),
      providesTags: (result) =>
        result
          ? [{ type: 'courses' as const, id: result.slug }, 'courses']
          : ['courses'],
    }),
  }),
});

export const { useCourseQuery, useLazyCourseQuery } = courseApi;
