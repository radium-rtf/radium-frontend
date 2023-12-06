import { emptyApi } from '@/shared';
import { CourseModuleResponseDto } from '../model/CourseModuleResponseDto';
import { CreateCourseModuleRequestDto } from '../model/CreateCourseModuleRequestDto';
import { UpdateCourseModuleNameRequestDto } from '../model/UpdateCourseModuleRequestDto';

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
  }),
  overrideExisting: true,
});

export const {
  useCreateCourseModuleMutation,
  useUpdateCourseModuleNameMutation,
  useDeleteCourseModuleMutation,
} = courseModuleApi;
