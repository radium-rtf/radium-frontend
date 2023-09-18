import { MultiChoiceSectionResponseDto } from '..';
import { AnswerSectionResponseDto } from './answerSectionResponseDto';
import { ChoiceSectionResponseDto } from './choiceSectionResponseDto';
import { TextSectionResponseDto } from './textSectionResponseDto';

export type AllSectionsResponseDto =
  | TextSectionResponseDto
  | ChoiceSectionResponseDto
  | MultiChoiceSectionResponseDto
  | AnswerSectionResponseDto;
