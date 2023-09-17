import { AllSectionsResponseDto } from '@/entities/Section';

export interface PageResponseDto {
  id: string;
  slug: string;
  name: string;
  order: number;
  score: number;
  maxScore: number;
  sections: AllSectionsResponseDto[];
}
