import { CourseResponseDto } from '@/entities/Course';
import { emptyApi } from '@/shared';

export const courseJoinApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    joinCourse: builder.mutation<CourseResponseDto, string>({
      query: (courseId) => ({
        url: `/course/join/${courseId}`,
        method: 'PATCH',
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

export const { useJoinCourseMutation } = courseJoinApi;
