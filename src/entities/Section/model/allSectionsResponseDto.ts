import { MultiChoiceSectionResponseDto } from '..';
import { AnswerSectionResponseDto } from './answerSectionResponseDto';
import { ChoiceSectionResponseDto } from './choiceSectionResponseDto';
import { ShortAnswerSectionResponseDto } from './shortAnswerSectionResponseDto';
import { TextSectionResponseDto } from './textSectionResponseDto';

export type AllSectionsResponseDto =
  | TextSectionResponseDto
  | ChoiceSectionResponseDto
  | MultiChoiceSectionResponseDto
  | AnswerSectionResponseDto
  | ShortAnswerSectionResponseDto;
