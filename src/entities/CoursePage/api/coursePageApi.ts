import { emptyApi } from '@/shared';
import { CoursePageResponseDto } from '../model/CoursePageResponseDto';
import { CreateCoursePageRequestDto } from '../model/CreateCoursePageRequestDto';
import { UpdateCoursePageRequestDto } from '../model/UpdateCoursePageRequestDto';
import { CoursePageChangeOrderRequestDto } from '../model/CoursePageChangeOrderRequestDto';
import { courseApi } from '@/entities/Course/api/courseApi';
import { arrayMove } from '@dnd-kit/sortable';

export const coursePageApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getPage: builder.query<CoursePageResponseDto, string>({
      query: (id) => ({
        url: `/page/${id}`,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'pages' as const, id: result.id },
              { type: 'pages', id: 'LIST' },
            ]
          : [{ type: 'pages', id: 'LIST' }],
    }),
    getPageBySlug: builder.query<CoursePageResponseDto, string>({
      query: (slug) => ({
        url: `/page/slug/${slug}`,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'pages' as const, id: result.id },
              { type: 'pages', id: 'LIST' },
            ]
          : [{ type: 'pages', id: 'LIST' }],
    }),
    createCoursePage: builder.mutation<CoursePageResponseDto, CreateCoursePageRequestDto>({
      query: (body) => ({
        url: '/page',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: (res) => [{ type: 'pages', id: res?.id }, 'courses'],
    }),
    updateCoursePageName: builder.mutation<CoursePageResponseDto, UpdateCoursePageRequestDto>({
      query: ({ id, ...body }) => ({
        url: `/page/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (res) =>
        res
          ? [{ type: 'pages', id: res.id }, { type: 'pages', id: 'LIST' }, 'courses']
          : [{ type: 'pages', id: 'LIST' }, 'courses'],
    }),
    deleteCoursePage: builder.mutation<void, string>({
      query: (pageId) => ({
        url: `/page/${pageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => ['courses'],
    }),
    changeCoursePageOrder: builder.mutation<CoursePageResponseDto, CoursePageChangeOrderRequestDto>(
      {
        query: ({ pageId, ...rest }) => ({
          url: `/page/${pageId}/order`,
          method: 'PATCH',
          body: {
            order: rest.order,
          },
        }),
        invalidatesTags: (_1, _2, args) => [{ type: 'courses', id: args.courseId }],
        async onQueryStarted({ moduleId, courseId, order, pageId }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            courseApi.util.updateQueryData('getCourse', courseId, (draft) => {
              const courseModule = draft.modules.find((m) => m.id === moduleId)!;
              const newIndex = courseModule?.pages.findIndex((p) => p.order === order);
              const oldIndex = courseModule?.pages.findIndex((p) => p.id === pageId);

              courseModule.pages = arrayMove(courseModule?.pages, oldIndex, newIndex);
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
      }
    ),
  }),
});

export const {
  useGetPageQuery,
  useGetPageBySlugQuery,
  useCreateCoursePageMutation,
  useUpdateCoursePageNameMutation,
  useDeleteCoursePageMutation,
  useChangeCoursePageOrderMutation,
} = coursePageApi;
