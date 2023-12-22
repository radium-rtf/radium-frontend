import { SectionResponseDto } from './CourseSectionResponseDto';

export interface MappingSectionResponseDto extends SectionResponseDto {
  type: 'mapping';
  content: string;
  answers: string[] | null;
  variants: string[];
  keys: string[];
}
