import { CourseResponseDto } from './CourseResponseDto';

export interface AccountCoursesResponseDto {
  my: CourseResponseDto[];
  recommendations: CourseResponseDto[];
}
