import { CoursePageResponseDto } from '@/entities/CoursePage';

export interface CourseModuleResponseDto {
  id: string;
  maxScore: number;
  name: string;
  order: number;
  pages: CoursePageResponseDto[];
  score: number;
  slug: string;
}
