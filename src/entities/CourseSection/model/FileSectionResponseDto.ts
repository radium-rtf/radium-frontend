import { FileType } from '@/shared';
import { SectionResponseDto } from './CourseSectionResponseDto';

export interface FileSectionResponseDto extends SectionResponseDto {
  type: 'file';
  fileTypes: FileType[];
  content: string;
}
