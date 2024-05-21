// Interfaces
export type { CourseResponseDto } from './model/CourseResponseDto';

// Methods
export { getAllCourses } from './lib/getAllCourses';
export { getUserCourses } from './lib/getUserCourses';
export { getCourse } from './lib/getCourse';

// Hooks
export {
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetCourseBySlugQuery,
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
} from './api/courseApi';
export { useLastCoursePage } from './lib/useLastCoursePage';
export { useCourseRoles } from './lib/useCourseRoles';

// Skeletons
export { CourseCardSkeleton } from './ui/CourseCardSkeleton';

// Constants
export {
  SECTION_MAX_ANSWERS_COUNT,
  SECTION_MAX_CONTENT_LENGTH,
  SECTION_MAX_VARIANT_LENGTH,
  SECTION_MIN_CONTENT_LENGTH,
  SECTION_MIN_VARIANT_LENGTH,
  SECTION_MAX_VARIANT_COUNT,
  SECTION_MIN_VARIANT_COUNT,
} from './lib/constants';
