import { emptyApi } from '@/shared';
import { UpdateTextSectionRequestDto } from '../model/updateTextSectionRequestDto';
import { CourseResponseDto } from '@/entities/Course';

const updateTextSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    updateTextSection: builder.mutation<
      CourseResponseDto['modules'][0]['pages'][0],
      UpdateTextSectionRequestDto
    >({
      query: ({ sectionId, ...body }) => ({
        url: `/section/${sectionId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (result) =>
        !result
          ? ['courses', 'pages']
          : [{ type: 'pages', id: result.id }, 'pages'],
    }),
  }),
  overrideExisting: true,
});

export const { useUpdateTextSectionMutation } = updateTextSectionApi;
