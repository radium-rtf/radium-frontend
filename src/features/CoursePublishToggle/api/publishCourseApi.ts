import { emptyApi } from '@/shared';
import { CourseResponseDto } from '@/entities/Course';

const publishCourseApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    publish: builder.mutation<CourseResponseDto, string>({
      query: (courseId) => ({
        url: `/course/publish/${courseId}`,
        method: 'PATCH',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  endpoints: { publish },
} = publishCourseApi;
