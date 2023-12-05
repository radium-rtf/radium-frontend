import { emptyApi } from '@/shared';
import { AnswerResponseDto } from '../model/AnswerResponseDto';
import { AnswerRequestDto } from '../model/AnswerRequestDto';

const sectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    answerCourseSection: builder.mutation<AnswerResponseDto, AnswerRequestDto>({
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

export const { useAnswerCourseSectionMutation } = sectionApi;
