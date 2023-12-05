import { SectionResponseDto } from './CourseSectionResponseDto';

export interface CourseTextSectionResponseDto extends SectionResponseDto {
  type: 'text';
  content: string;
}
