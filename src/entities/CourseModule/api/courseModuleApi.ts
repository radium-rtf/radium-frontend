import { emptyApi } from '@/shared';
import { CourseModuleResponseDto } from '../model/CourseModuleResponseDto';
import { CreateCourseModuleRequestDto } from '../model/CreateCourseModuleRequestDto';
import { UpdateCourseModuleNameRequestDto } from '../model/UpdateCourseModuleRequestDto';
import { CourseModuleChangeOrderRequestDto } from '../model/CourseModuleChangeOrderRequestDto';
import { courseApi } from '@/entities/Course/api/courseApi';
import { arrayMove } from '@dnd-kit/sortable';

const courseModuleApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourseModule: builder.mutation<
      CourseModuleResponseDto,
      CreateCourseModuleRequestDto
    >({
      query: (body) => ({
        url: '/module',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['courses', 'pages'],
    }),
    updateCourseModuleName: builder.mutation<
      CourseModuleResponseDto,
      UpdateCourseModuleNameRequestDto
    >({
      query: ({ id, ...body }) => ({
        url: `/module/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['courses'],
    }),
    deleteCourseModule: builder.mutation<void, string>({
      query: (moduleId) => ({
        url: `/module/${moduleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => ['courses'],
    }),
    changeCourseModuleOrder: builder.mutation<
      CourseModuleResponseDto,
      CourseModuleChangeOrderRequestDto
    >({
      query: ({ moduleId, ...rest }) => ({
        url: `/module/${moduleId}/order`,
        method: 'PATCH',
        body: {
          order: rest.order,
        },
      }),
      invalidatesTags: (_1, _2, args) => [
        { type: 'courses', id: args.courseId },
      ],
      async onQueryStarted(
        { moduleId, courseId, order },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          courseApi.util.updateQueryData('getCourse', courseId, (draft) => {
            const newIndex = draft.modules.findIndex((m) => m.order === order);
            const oldIndex = draft.modules.findIndex((m) => m.id === moduleId);

            console.log(newIndex, oldIndex);

            draft.modules = arrayMove(draft.modules, oldIndex, newIndex);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateCourseModuleMutation,
  useUpdateCourseModuleNameMutation,
  useDeleteCourseModuleMutation,
  useChangeCourseModuleOrderMutation,
} = courseModuleApi;
