import { emptyApi } from '@/shared';
import { CourseResponseDto } from '@/entities/Course';
import { UpdateDescriptionRequestDto } from '../model/updateDescriptionRequestDto';

const courseBriefApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    description: builder.mutation<
      CourseResponseDto,
      UpdateDescriptionRequestDto
    >({
      query: ({ courseId, ...body }) => ({
        url: `/course/${courseId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (res) => [{ type: 'courses', id: res?.id }, 'courses'],
    }),
  }),
});

export const { useDescriptionMutation } = courseBriefApi;
