import { CourseResponseDto } from './CourseResponseDto';

export interface AccountCoursesResponseDto {
  authorship: CourseResponseDto[];
  my: CourseResponseDto[];
  recommendations: CourseResponseDto[];
}
