import { emptyApi } from '@/shared';
import { UpdateShortAnswerSectionRequestDto } from '../model/updateShortAnswerSectionRequestDto';
import { UpdateShortAnswerSectionResponseDto } from '../model/updateShortAnswerSectionResponseDto';
import { AnswerShortAnswerSectionRequestDto } from '../model/answerShortAnswerSectionRequestDto';
import { AnswerShortAnswerSectionResponseDto } from '../model/answerShortAnswerSectionResponseDto';

const shortAnswerSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    answerShortAnswerSection: builder.mutation<
      AnswerShortAnswerSectionResponseDto,
      AnswerShortAnswerSectionRequestDto
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
    updateShortAnswerSection: builder.mutation<
      UpdateShortAnswerSectionResponseDto,
      UpdateShortAnswerSectionRequestDto
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
  useAnswerShortAnswerSectionMutation,
  useUpdateShortAnswerSectionMutation,
} = shortAnswerSectionApi;
