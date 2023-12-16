import { emptyApi } from '@/shared';
import { CoursePageResponseDto } from '../model/CoursePageResponseDto';
import { CreateCoursePageRequestDto } from '../model/CreateCoursePageRequestDto';
import { UpdateCoursePageRequestDto } from '../model/UpdateCoursePageRequestDto';

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
    createCoursePage: builder.mutation<
      CoursePageResponseDto,
      CreateCoursePageRequestDto
    >({
      query: (body) => ({
        url: '/page',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: (res) => [{ type: 'pages', id: res?.id }, 'courses'],
    }),
    updateCoursePageName: builder.mutation<
      CoursePageResponseDto,
      UpdateCoursePageRequestDto
    >({
      query: ({ id, ...body }) => ({
        url: `/page/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (res) =>
        res
          ? [
              { type: 'pages', id: res.id },
              { type: 'pages', id: 'LIST' },
              'courses',
            ]
          : [{ type: 'pages', id: 'LIST' }, 'courses'],
    }),
    deleteCoursePage: builder.mutation<void, string>({
      query: (pageId) => ({
        url: `/page/${pageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => ['courses'],
    }),
  }),
});

export const {
  useGetPageQuery,
  useCreateCoursePageMutation,
  useUpdateCoursePageNameMutation,
  useDeleteCoursePageMutation,
} = coursePageApi;
