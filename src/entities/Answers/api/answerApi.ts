import { emptyApi } from '@/shared';
import { AnswersDto } from '@/entities/Answers/model/answersDto';

const answerApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    answers: builder.query<AnswersDto, { groupId: string; course_id: string }>({
      query: ({ groupId, course_id }): { url: string } => ({
        url: `/answers/group/${groupId}?course_id=${course_id}`,
      }),
      providesTags: ['review'],
    }),
  }),
});

export const { useAnswersQuery, useLazyAnswersQuery } = answerApi;
