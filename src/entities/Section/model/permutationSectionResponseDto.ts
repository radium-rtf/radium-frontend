import { SectionResponseDto } from './sectionResponseDto';

export interface PermutationSectionResponseDto extends SectionResponseDto {
  type: 'permutation';
  content: string;
  variants: string[];
  answers: string[];
}
