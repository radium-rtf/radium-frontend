import { emptyApi } from '@/shared';
import { AnswerCodeSectionResponseDto } from '../model/answerCodeSectionResponseDto';
import { AnswerCodeSectionRequestDto } from '../model/answerCodeSectionRequestDto';

export const CodeSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    answerCodeSection: builder.mutation<
      AnswerCodeSectionResponseDto,
      AnswerCodeSectionRequestDto
    >({
      query: (body) => ({
        url: '/answer',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: (response, _, request) => [
        { type: 'pages', id: request.id },
        'pages',
        'courses',
      ],
    }),
  }),
});

export const { useAnswerCodeSectionMutation } = CodeSectionApi;
