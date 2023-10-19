import { SectionResponseDto } from './sectionResponseDto';

export interface ShortAnswerSectionResponseDto extends SectionResponseDto {
  type: 'shortAnswer';
  content: string;
  answer: string;
}
