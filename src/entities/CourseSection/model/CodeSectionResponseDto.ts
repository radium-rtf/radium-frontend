import { SectionResponseDto } from './CourseSectionResponseDto';

export interface CodeSectionResponseDto extends SectionResponseDto {
  type: 'code';
  content: string;
  answer: string;
  languages: string[];
}
