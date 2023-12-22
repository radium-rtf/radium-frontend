export type { CoursePageResponseDto } from './model/CoursePageResponseDto';

export {
  coursePageApi,
  useGetPageQuery,
  useCreateCoursePageMutation,
  useUpdateCoursePageNameMutation,
  useDeleteCoursePageMutation,
  useChangeCoursePageOrderMutation,
} from './api/coursePageApi';
