import { SectionResponseDto } from './CourseSectionResponseDto';

export interface PermutationSectionResponseDto extends SectionResponseDto {
  type: 'permutation';
  content: string;
  variants: string[];
  answers: string[];
}
