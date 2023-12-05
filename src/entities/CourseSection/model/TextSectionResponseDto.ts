import { SectionResponseDto } from './CourseSectionResponseDto';

export interface TextSectionResponseDto extends SectionResponseDto {
  type: 'text';
  content: string;
}
