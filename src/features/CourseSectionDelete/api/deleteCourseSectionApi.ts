import { emptyApi } from '@/shared';
import { DeleteCourseSectionRequestDto } from '../model/deleteCourseSectionRequestDto';

const deleteCourseSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCourseSection: builder.mutation<
      undefined,
      DeleteCourseSectionRequestDto
    >({
      query: ({ sectionId }) => ({
        url: `/section/${sectionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, err, { pageId }) =>
        !err ? [{ type: 'pages', id: pageId }, 'pages'] : ['pages'],
    }),
  }),
  overrideExisting: true,
});

export const { useDeleteCourseSectionMutation } = deleteCourseSectionApi;
