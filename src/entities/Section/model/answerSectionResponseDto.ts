import { SectionResponseDto } from './sectionResponseDto';

export interface AnswerSectionResponseDto extends SectionResponseDto {
  type: 'answer';
  content: string;
  answer: string;
}
