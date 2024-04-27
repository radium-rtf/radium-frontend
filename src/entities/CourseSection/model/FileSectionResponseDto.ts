import { SectionResponseDto } from './CourseSectionResponseDto';

export interface FileSectionResponseDto extends SectionResponseDto {
  type: 'file';
  fileTypes: string[];
  content: string;
}
