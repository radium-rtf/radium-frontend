import { SectionResponseDto } from './CourseSectionResponseDto';

export interface AnswerSectionResponseDto extends SectionResponseDto {
  type: 'answer';
  content: string;
  answer: string;
}
