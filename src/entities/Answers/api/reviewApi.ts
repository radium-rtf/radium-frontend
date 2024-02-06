import { emptyApi } from '@/shared';
import { AnswersDto } from '@/entities/Answers/model/answersDto';
import { AnswersRequestDto } from '@/entities/Answers/model/answersRequestDto';

const reviewApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    review: builder.mutation<AnswersDto, AnswersRequestDto>({
      query: (body) => ({
        url: `/review`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['review'],
    }),
  }),
});

export const { useReviewMutation } = reviewApi;
