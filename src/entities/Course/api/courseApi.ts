import { emptyApi } from '@/shared';
import { CourseResponseDto } from '../model/CourseResponseDto';
import { CourseUpdateBriefRequestDto } from '../model/CourseUpdateBriefRequestDto';
import { CourseUpdateDescriptionRequestDto } from '../model/CourseUpdateDescriptionRequestDto';
import { CourseUpdateBannerRequestDto } from '../model/CourseUpdateBannerRequestDto';
import { AccountCoursesResponseDto } from '../model/AccountCoursesResponseDto';
import { CourseUpdateLogoRequestDto } from '../model/CourseUpdateLogoRequestDto';
import { CourseAddCoAuthorRequestDto } from '../model/CourseAddCoAuthorRequestDto';
import { CourseAddContactResponseDto } from '../model/CourseAddContactResponseDto';
import { CourseAddContactRequestDto } from '../model/CourseAddContactRequestDto';
import { CourseDeleteCoAuthorRequestDto } from '../model/CourseDeleteCoAuthorRequestDto';

export const courseApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<CourseResponseDto[], void>({
      query: () => ({
        url: '/course',
      }),
      providesTags: [{ type: 'courses', id: 'LIST' }],
    }),
    getAccountCourses: builder.query<AccountCoursesResponseDto, void>({
      query: () => ({
        url: '/account/courses',
      }),
      providesTags: [{ type: 'courses', id: 'LIST' }],
    }),
    getCourse: builder.query<CourseResponseDto, string>({
      query: (slug) => ({
        url: `/course/${slug}`,
      }),
      providesTags: (result) =>
        result ? [{ type: 'courses' as const, id: result.id }] : [],
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
    publishCourse: builder.mutation<CourseResponseDto, string>({
      query: (courseId) => ({
        url: `/course/publish/${courseId}`,
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
      async onQueryStarted(courseId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          courseApi.util.updateQueryData(
            'getAccountCourses',
            undefined,
            (draft) => {
              const authorShipIndex = draft.authorship.findIndex(
                (course) => course.id === courseId
              );
              const myIndex = draft.my.findIndex(
                (course) => course.id === courseId
              );
              const recomendationsIndex = draft.recommendations.findIndex(
                (course) => course.id === courseId
              );
              authorShipIndex !== -1 &&
                draft.authorship.splice(authorShipIndex, 1);
              myIndex !== -1 && draft.my.splice(myIndex, 1);
              recomendationsIndex !== -1 &&
                draft.recommendations.splice(recomendationsIndex, 1);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
      invalidatesTags: [{ type: 'courses', id: 'LIST' }],
      async onQueryStarted({ courseId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          dispatch(
            courseApi.util.updateQueryData('getCourse', courseId, (draft) => {
              draft.name = updatedPost.name;
              draft.shortDescription = updatedPost.shortDescription;
            })
          );
        } catch {}
      },
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
      invalidatesTags: [{ type: 'courses', id: 'LIST' }],
      async onQueryStarted({ courseId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          dispatch(
            courseApi.util.updateQueryData('getCourse', courseId, (draft) => {
              draft.description = updatedPost.description;
            })
          );
        } catch {}
      },
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
      invalidatesTags: (res) =>
        res
          ? [
              { type: 'courses', id: res.id },
              { type: 'courses', id: 'LIST' },
            ]
          : [{ type: 'courses', id: 'LIST' }],
    }),
    updateCourseLogo: builder.mutation<
      CourseResponseDto,
      CourseUpdateLogoRequestDto
    >({
      query: ({ courseId, ...body }) => ({
        url: `/course/${courseId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (res) =>
        res
          ? [
              { type: 'courses', id: res.id },
              { type: 'courses', id: 'LIST' },
            ]
          : [{ type: 'courses', id: 'LIST' }],
    }),
    addCourseCoAuthor: builder.mutation<void, CourseAddCoAuthorRequestDto>({
      query: (body) => ({
        url: '/role/coauthor',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: (_1, _2, args) => [
        { type: 'courses', id: args.courseId },
        { type: 'courses', id: 'LIST' },
      ],
    }),
    deleteCourseCoAuthor: builder.mutation<
      void,
      CourseDeleteCoAuthorRequestDto
    >({
      query: ({ coAuthorId, courseId }) => ({
        url: `/role/coauthor/${coAuthorId}/${courseId}`,
        method: 'DELETE',
      }),
      async onQueryStarted(
        { courseId, coAuthorId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          courseApi.util.updateQueryData('getCourse', courseId, (draft) => {
            const index = draft.coauthors.findIndex(
              (coAuthor) => coAuthor.id === coAuthorId
            );
            if (index !== -1) {
              draft.coauthors.splice(index, 1);
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
    addCourseContact: builder.mutation<
      CourseAddContactResponseDto,
      CourseAddContactRequestDto
    >({
      query: ({ courseId, ...body }) => ({
        url: `/course/link/${courseId}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: (_1, _2, args) => [
        { type: 'courses', id: args.courseId },
      ],
    }),
    deleteCourseContact: builder.mutation<
      void,
      { contactId: string; courseId: string }
    >({
      query: ({ contactId }) => ({
        url: `/course/link/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_1, _2, args) => [
        { type: 'courses', id: args.courseId },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetAccountCoursesQuery,
  useCreateCourseMutation,
  useJoinCourseMutation,
  usePublishCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseBriefMutation,
  useUpdateCourseDescriptionMutation,
  useUpdateCourseBannerMutation,
  useUpdateCourseLogoMutation,
  useAddCourseCoAuthorMutation,
  useDeleteCourseCoAuthorMutation,
  useAddCourseContactMutation,
  useDeleteCourseContactMutation,
} = courseApi;
