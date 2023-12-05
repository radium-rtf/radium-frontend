// Interfaces
export type { CourseResponseDto } from './model/CourseResponseDto';

// Methods
export { getAllCourses } from './lib/getAllCourses';
export { getUserCourses } from './lib/getUserCourses';
export { getCourse } from './lib/getCourse';

// UI
export { CourseCard } from './ui/CourseCard';
export { CourseAuthors } from './ui/CourseAuthors';
export { CourseContacts } from './ui/CourseContacts';

// Hooks
export {
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useJoinCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseBriefMutation,
  useUpdateCourseDescriptionMutation,
  useUpdateCourseBannerMutation,
} from './api/courseApi';

// Skeletons
export { CourseCardSkeleton } from './ui/CourseCardSkeleton';
