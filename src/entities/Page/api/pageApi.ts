import { emptyApi } from '@/shared';
import { PageResponseDto } from '../model/PageResponseDto';

const pageApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    page: builder.query<PageResponseDto, string>({
      query: (id) => ({
        url: `/page/${id}`,
      }),
      providesTags: (result) =>
        result
          ? [{ type: 'pages' as const, id: result.id }, 'pages']
          : ['pages'],
    }),
  }),
});

export const { usePageQuery, useLazyPageQuery } = pageApi;
