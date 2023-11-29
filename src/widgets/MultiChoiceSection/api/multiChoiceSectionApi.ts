import { emptyApi } from '@/shared';
import { updateMultiChoiceSectionRequestDto } from '../model/updateMultiChoiceSectionRequestDto';
import { updateMultiChoiceSectionResponseDto } from '../model/updateMultiChoiceSectionResponseDto';
import { AnswerMultiChoiceSectionRequestDto } from '../model/answerMultiChoiceSectionRequestDto';
import { AnswerMultiChoiceSectionResponseDto } from '../model/answerMultiChoiceSectionResponseDto';

const multiChoiceSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    answerMultiChoiceSection: builder.mutation<
      AnswerMultiChoiceSectionResponseDto,
      AnswerMultiChoiceSectionRequestDto
    >({
      query: (body) => ({
        url: `/answer`,
        body,
        method: 'POST',
      }),
      invalidatesTags: (response, _, request) => [
        { type: 'pages', id: request.id },
        'pages',
        'courses',
      ],
    }),
    updateMultiChoiceSection: builder.mutation<
      updateMultiChoiceSectionResponseDto,
      updateMultiChoiceSectionRequestDto
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
});

export const {
  useAnswerMultiChoiceSectionMutation,
  useUpdateMultiChoiceSectionMutation,
} = multiChoiceSectionApi;
