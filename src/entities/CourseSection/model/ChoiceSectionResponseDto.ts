import { SectionResponseDto } from './CourseSectionResponseDto';

export interface ChoiceSectionResponseDto extends SectionResponseDto {
  type: 'choice';
  answer: string;
  content: string;
  variants: string[];
}
