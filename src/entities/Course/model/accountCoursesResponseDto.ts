import { CourseResponseDto } from './courseResponseDto';

export interface AccountCoursesResponseDto {
  my: CourseResponseDto[];
  recommendations: CourseResponseDto[];
}
