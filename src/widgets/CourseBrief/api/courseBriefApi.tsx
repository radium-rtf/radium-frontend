import { emptyApi } from '@/shared';
import { CourseBriefRequestDto } from '../model/CourseBriefRequestDto';
import { CourseResponseDto } from '@/entities/Course';

const courseBriefApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    brief: builder.mutation<CourseResponseDto, CourseBriefRequestDto>({
      query: ({ courseId, ...body }) => ({
        url: `/course/${courseId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (res) => [{ type: 'courses', id: res?.id }, 'courses'],
    }),
  }),
});

export const { useBriefMutation } = courseBriefApi;
