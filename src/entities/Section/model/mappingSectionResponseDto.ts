import { SectionResponseDto } from './sectionResponseDto';

export interface MappingSectionResponseDto extends SectionResponseDto {
  type: 'mapping';
  content: string;
  answer: string[] | null;
  variants: string[];
  keys: string[];
}
