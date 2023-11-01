import { CourseResponseDto } from '@/entities/Course';
import { emptyApi } from '@/shared';
import { CreatePageRequestDto } from '../model/createPageRequestDto';

const createPageApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    createPage: builder.mutation<
      CourseResponseDto['modules'][0]['pages'][0],
      CreatePageRequestDto
    >({
      query: (body) => ({
        url: '/page',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: (res) => [{ type: 'pages', id: res?.id }, 'courses'],
    }),
  }),
  overrideExisting: true,
});

export const { useCreatePageMutation } = createPageApi;
