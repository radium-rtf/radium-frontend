import { emptyApi } from '@/shared';

const deleteCourseSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCourseSection: builder.mutation<undefined, string>({
      query: (sectionId) => ({
        url: `/section/${sectionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['courses'],
    }),
  }),
  overrideExisting: true,
});

export const { useDeleteCourseSectionMutation } = deleteCourseSectionApi;
