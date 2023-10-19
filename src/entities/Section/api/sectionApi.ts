import { emptyApi } from '@/shared';
import { AnswerResponseDto } from '../model/answerResponseDto';
import { AnswerRequestDto } from '../model/answerRequestDto';

const sectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    answer: builder.mutation<AnswerResponseDto, AnswerRequestDto>({
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
  }),
});

export const { useAnswerMutation } = sectionApi;
