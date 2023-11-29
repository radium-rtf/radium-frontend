import { AnswerResponseDto } from '@/entities/Section';
import { AnswerRequestDto } from '@/entities/Section/model/answerRequestDto';
import { emptyApi } from '@/shared';
import { updateChoiceSectionRequestDto } from '../model/updateChoiceSectionRequestDto';
import { updateChoiceSectionResponseDto } from '../model/updateChoiceSectionResponseDto';

const choiceSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    answerChoiceSection: builder.mutation<AnswerResponseDto, AnswerRequestDto>({
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
    updateChoiceSection: builder.mutation<
      updateChoiceSectionResponseDto,
      updateChoiceSectionRequestDto
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
  useAnswerChoiceSectionMutation,
  useUpdateChoiceSectionMutation,
} = choiceSectionApi;
