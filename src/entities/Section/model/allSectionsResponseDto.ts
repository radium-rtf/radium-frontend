import { TextSectionResponseDto } from './textSectionResponseDto';
import { ChoiceSectionResponseDto } from './choiceSectionResponseDto';
import { MultiChoiceSectionResponseDto } from './multiChoiceSectionResponseDto';
import { AnswerSectionResponseDto } from './answerSectionResponseDto';
import { ShortAnswerSectionResponseDto } from './shortAnswerSectionResponseDto';
import { PermutationSectionResponseDto } from './permutationSectionResponseDto';
import { CodeSectionResponseDto } from './codeSectionResponseDto';
import { MappingSectionResponseDto } from './mappingSectionResponseDto';

export type AllSectionsResponseDto =
  | TextSectionResponseDto
  | ChoiceSectionResponseDto
  | MultiChoiceSectionResponseDto
  | AnswerSectionResponseDto
  | ShortAnswerSectionResponseDto
  | PermutationSectionResponseDto
  | CodeSectionResponseDto
  | MappingSectionResponseDto;
