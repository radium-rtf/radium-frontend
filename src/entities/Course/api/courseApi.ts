import { emptyApi } from '@/shared';
import { CourseResponseDto } from '../model/courseResponseDto';
import { CourseUpdateBriefRequestDto } from '../model/CourseUpdateBriefRequestDto';
import { CourseUpdateDescriptionRequestDto } from '../model/CourseUpdateDescriptionRequestDto';
import { CourseUpdateBannerRequestDto } from '../model/CourseUpdateBannerRequestDto';

const courseApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<CourseResponseDto[], void>({
      query: () => ({
        url: '/course',
      }),
      providesTags: [{ type: 'courses', id: 'LIST' }],
    }),
    getCourse: builder.query<CourseResponseDto, string>({
      query: (slug) => ({
        url: `/course/${slug}`,
      }),
      providesTags: (result) =>
        result
          ? [{ type: 'courses' as const, id: result.slug }, 'courses']
          : ['courses'],
    }),
    createCourse: builder.mutation<CourseResponseDto, void>({
      query: () => ({
        url: '/course',
        method: 'POST',
        body: {},
      }),
      invalidatesTags: (res) =>
        res
          ? [
              { type: 'courses', id: res.id },
              { type: 'courses', id: 'LIST' },
            ]
          : [{ type: 'courses', id: 'LIST' }],
    }),
    joinCourse: builder.mutation<CourseResponseDto, string>({
      query: (courseId) => ({
        url: `/course/join/${courseId}`,
        method: 'PATCH',
      }),
      invalidatesTags: (res) =>
        res
          ? [
              { type: 'courses', id: res.id },
              { type: 'courses', id: 'LIST' },
            ]
          : [{ type: 'courses', id: 'LIST' }],
    }),
    deleteCourse: builder.mutation<void, string>({
      query: (courseId) => ({
        url: `/course/${courseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'courses', id: 'LIST' }],
    }),
    updateCourseBrief: builder.mutation<
      CourseResponseDto,
      CourseUpdateBriefRequestDto
    >({
      query: ({ courseId, ...body }) => ({
        url: `/course/${courseId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (res) =>
        res
          ? [{ type: 'courses', id: res.id }]
          : [{ type: 'courses', id: 'LIST' }],
    }),
    updateCourseDescription: builder.mutation<
      CourseResponseDto,
      CourseUpdateDescriptionRequestDto
    >({
      query: ({ courseId, ...body }) => ({
        url: `/course/${courseId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (res) => [{ type: 'courses', id: res?.id }, 'courses'],
    }),
    updateCourseBanner: builder.mutation<
      CourseResponseDto,
      CourseUpdateBannerRequestDto
    >({
      query: ({ courseId, ...body }) => ({
        url: `/course/${courseId}`,
        method: 'PUT',
        body: body,
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useJoinCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseBriefMutation,
  useUpdateCourseDescriptionMutation,
  useUpdateCourseBannerMutation,
} = courseApi;
