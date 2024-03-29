import { SectionResponseDto } from './CourseSectionResponseDto';

export interface ShortAnswerSectionResponseDto extends SectionResponseDto {
  type: 'shortAnswer';
  content: string;
  answer: string;
}
