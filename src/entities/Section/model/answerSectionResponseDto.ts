import { SectionResponseDto } from '..';

export interface AnswerSectionResponseDto extends SectionResponseDto {
  type: 'answer';
  content: string;
  answer: string;
}
