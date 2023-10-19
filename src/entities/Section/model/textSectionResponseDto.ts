import { SectionResponseDto } from './sectionResponseDto';

export interface TextSectionResponseDto extends SectionResponseDto {
  type: 'text';
  content: string;
}
