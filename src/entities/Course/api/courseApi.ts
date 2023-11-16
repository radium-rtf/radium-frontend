import { emptyApi } from '@/shared';
import { CourseResponseDto } from '../model/courseResponseDto';

const courseApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    courseBySlug: builder.query<CourseResponseDto, string>({
      query: (slug) => {
        return ({
          url: `/course/slug/${slug}`,
        });
      },
      providesTags: (result) =>
        result
          ? [{ type: 'courses' as const, id: result.slug }, 'courses']
          : ['courses'],
    }),

    courseById: builder.query<CourseResponseDto, string>({
      query: (courseId) => {
        return ({
          url: `/course/${courseId}`,
        });
      },
      providesTags: (result) =>
        result
          ? [{ type: 'courses' as const, id: result.slug }, 'courses']
          : ['courses'],
    }),
  }),
});

export const {
  useCourseBySlugQuery,
  useLazyCourseBySlugQuery,
  useCourseByIdQuery,
  useLazyCourseByIdQuery
} = courseApi;
