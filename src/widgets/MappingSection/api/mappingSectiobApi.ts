import { emptyApi } from '@/shared';
import { AnswerMappingSectionRequestDto } from '../model/answerMappingSectionRequestDto';
import { AnswerMappingSectionResponseDto } from '../model/answerMappingSectionResponseDto';
import { UpdateMappingSectionResponseDto } from '../model/updateMappingSectionResponseDto';
import { updateMappingSectionRequestDto } from '../model/updateMappingSectionRequestDto';

export const mappingSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    answerMappingSection: builder.mutation<
      AnswerMappingSectionResponseDto,
      AnswerMappingSectionRequestDto
    >({
      query: (body) => ({
        url: '/answer',
        body,
        method: 'POST',
      }),
    }),
    updateMappingSection: builder.mutation<
      UpdateMappingSectionResponseDto,
      updateMappingSectionRequestDto
    >({
      query: ({ sectionId, ...body }) => ({
        url: `/section/${sectionId}`,
        body,
        method: 'PUT',
      }),
      invalidatesTags: (res) =>
        res
          ? [{ type: 'pages', id: res.pageId }, 'pages', 'courses']
          : ['pages', 'courses'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAnswerMappingSectionMutation,
  useUpdateMappingSectionMutation,
} = mappingSectionApi;
