import { SectionResponseDto } from './sectionResponseDto';

export interface ChoiceSectionResponseDto extends SectionResponseDto {
  type: 'choice';
  answer: string;
  content: string;
  variants: string[];
}
