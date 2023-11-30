import { emptyApi } from '@/shared';
import { AnswerPermutationsSectionRequestDto } from '../model/answerPermutationsSectionRequestDto';
import { AnswerPermutationsSectionResponseDto } from '../model/answerPermutationsSectionResponseDto';
import { UpdatePermutationsSectionResponseDto } from '../model/updatePermutationsSectionResponseDto';
import { UpdatePermutationsSectionRequestDto } from '../model/updatePermutationsSectionRequestDto';

export const permutationsSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    answerPermutationsSection: builder.mutation<
      AnswerPermutationsSectionResponseDto,
      AnswerPermutationsSectionRequestDto
    >({
      query: (body) => ({
        url: '/answer',
        body: body,
        method: 'POST',
      }),
      invalidatesTags: (response, _, request) => [
        { type: 'pages', id: request.id },
        'pages',
        'courses',
      ],
    }),
    updatePermutationsSection: builder.mutation<
      UpdatePermutationsSectionResponseDto,
      UpdatePermutationsSectionRequestDto
    >({
      query: ({ sectionId, ...body }) => ({
        url: `/section/${sectionId}`,
        body: body,
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
  useAnswerPermutationsSectionMutation,
  useUpdatePermutationsSectionMutation,
} = permutationsSectionApi;
