// Interfaces
export type { CourseResponseDto } from './model/CourseResponseDto';

// Methods
export { getAllCourses } from './lib/getAllCourses';
export { getUserCourses } from './lib/getUserCourses';
export { getCourse } from './lib/getCourse';

// UI
export { CourseAuthors } from './ui/CourseAuthors';
export { CourseContacts } from './ui/CourseContacts';

// Hooks
export {
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
} from './api/courseApi';
export { useLastCoursePage } from './lib/useLastCoursePage';
export { useCourseRoles } from './lib/useCourseRoles';

// Skeletons
export { CourseCardSkeleton } from './ui/CourseCardSkeleton';
