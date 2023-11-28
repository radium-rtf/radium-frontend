import { emptyApi } from '@/shared';
import { CreateSectionRequestDto } from '../model/createSectionRequestDto';

const createCourseSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    createSection: builder.mutation<
      { pageId: string },
      CreateSectionRequestDto
    >({
      query: (body) => ({
        url: '/section',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: (res) => [{ type: 'pages', id: res?.pageId }, 'courses'],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateSectionMutation } = createCourseSectionApi;
