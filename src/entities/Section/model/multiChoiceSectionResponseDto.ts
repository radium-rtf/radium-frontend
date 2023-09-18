import { SectionResponseDto } from '..';

export interface MultiChoiceSectionResponseDto extends SectionResponseDto {
  type: 'multiChoice';
  variants: string[];
  content: string;
  answer: string;
  answers: string[] | null;
}
