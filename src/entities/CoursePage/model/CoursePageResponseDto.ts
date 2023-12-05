import { AllSectionsResponseDto } from '@/entities/CourseSection';

export interface CoursePageResponseDto {
  id: string;
  slug: string;
  name: string;
  order: number;
  score: number;
  maxScore: number;
  next: string | null;
  previous: string | null;
  sections: AllSectionsResponseDto[];
}
