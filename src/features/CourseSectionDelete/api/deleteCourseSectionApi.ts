import { emptyApi } from '@/shared';
import { coursePageApi } from '@/entities/CoursePage';
import { DeleteCourseSectionRequestDto } from '../model/deleteCourseSectionRequestDto';

const deleteCourseSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCourseSection: builder.mutation<undefined, DeleteCourseSectionRequestDto>({
      query: ({ sectionId }) => ({
        url: `/section/${sectionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['courses'],
      async onQueryStarted({ pageId, sectionId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          coursePageApi.util.updateQueryData('getPage', pageId, (draft) => {
            const sectionIndex = draft.sections.findIndex((s) => s.id === sectionId);
            if (sectionIndex !== -1) {
              draft.maxScore -= draft.sections[sectionIndex].maxScore;
              draft.sections.splice(sectionIndex, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useDeleteCourseSectionMutation } = deleteCourseSectionApi;
