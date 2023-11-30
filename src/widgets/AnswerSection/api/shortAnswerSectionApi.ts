import { emptyApi } from '@/shared';
import { UpdateAnswerSectionRequestDto } from '../model/updateAnswerSectionRequestDto';
import { UpdateAnswerSectionResponseDto } from '../model/updateAnswerSectionResponseDto';
import { AnswerAnswerSectionRequestDto } from '../model/answerAnswerSectionRequestDto';
import { AnswerAnswerSectionResponseDto } from '../model/answerAnswerSectionResponseDto';

const answerSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    answerAnswerSection: builder.mutation<
      AnswerAnswerSectionResponseDto,
      AnswerAnswerSectionRequestDto
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
    updateAnswerSection: builder.mutation<
      UpdateAnswerSectionResponseDto,
      UpdateAnswerSectionRequestDto
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
  useAnswerAnswerSectionMutation,
  useUpdateAnswerSectionMutation,
} = answerSectionApi;
