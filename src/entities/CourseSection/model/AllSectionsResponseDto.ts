import { TextSectionResponseDto } from './TextSectionResponseDto';
import { ChoiceSectionResponseDto } from './ChoiceSectionResponseDto';
import { MultiChoiceSectionResponseDto } from './MultiChoiceSectionResponseDto';
import { AnswerSectionResponseDto } from './AnswerSectionResponseDto';
import { ShortAnswerSectionResponseDto } from './ShortAnswerSectionResponseDto';
import { PermutationSectionResponseDto } from './PermutationSectionResponseDto';
import { CodeSectionResponseDto } from './CodeSectionResponseDto';
import { MappingSectionResponseDto } from './MappingSectionResponseDto';

export type AllSectionsResponseDto =
  | TextSectionResponseDto
  | ChoiceSectionResponseDto
  | MultiChoiceSectionResponseDto
  | AnswerSectionResponseDto
  | ShortAnswerSectionResponseDto
  | PermutationSectionResponseDto
  | CodeSectionResponseDto
  | MappingSectionResponseDto;
