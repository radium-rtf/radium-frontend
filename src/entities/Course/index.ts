// Interfaces
export type { CourseResponseDto } from './model/courseResponseDto';

// Methods
export { getAllCourses } from './lib/getAllCourses';
export { getUserCourses } from './lib/getUserCourses';
export { getCourseBySlug, getCourseById } from './lib/getCourse';

// UI
export { CourseCard } from './ui/CourseCard';
export { CourseBrief } from './ui/CourseBrief';
export { CourseDescription } from './ui/CourseDescription';
export { CourseAuthors } from './ui/CourseAuthors';
export { CourseContacts } from './ui/CourseContacts';
export { CourseNavigation } from './ui/CourseNavigation';

// Hooks
export {
    useCourseBySlugQuery,
    useLazyCourseBySlugQuery,
    useCourseByIdQuery,
    useLazyCourseByIdQuery
} from './api/courseApi';

// Skeletons
export { CourseCardSkeleton } from './ui/CourseCardSkeleton';
