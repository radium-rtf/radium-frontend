import { emptyApi } from '@/shared';
import { CreateSectionRequestDto } from '../model/createSectionRequestDto';
import { AllSectionsResponseDto, SectionResponseDto } from '@/entities/CourseSection';
import { coursePageApi } from '@/entities/CoursePage';

const createCourseSectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    createSection: builder.mutation<SectionResponseDto, CreateSectionRequestDto>({
      query: (body) => ({
        url: '/section',
        method: 'POST',
        body: body,
      }),
      // invalidatesTags: (res) => [{ type: 'pages', id: res?.pageId }, 'courses'],
      async onQueryStarted({ pageId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          dispatch(
            coursePageApi.util.updateQueryData('getPage', pageId, (draft) => {
              draft.sections.push(updatedPost as AllSectionsResponseDto);
            })
          );
        } catch {}
      },
    }),
  }),
  overrideExisting: true,
});

export const { useCreateSectionMutation } = createCourseSectionApi;
