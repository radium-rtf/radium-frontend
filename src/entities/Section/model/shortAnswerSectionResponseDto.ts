import { SectionResponseDto } from '..';

export interface ShortAnswerSectionResponseDto extends SectionResponseDto {
  type: 'shortAnswer';
  content: string;
  answer: string;
}
