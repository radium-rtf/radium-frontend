import { emptyApi } from '@/shared';
import { CourseResponseDto } from '@/entities/Course';

const deleteCourseApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCourse: builder.mutation<CourseResponseDto, string>({
      query: (courseId) => ({
        url: `/course/${courseId}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  endpoints: { deleteCourse },
} = deleteCourseApi;
