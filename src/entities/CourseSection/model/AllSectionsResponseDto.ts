import { CourseTextSectionResponseDto } from './TextSectionResponseDto';
import { ChoiceSectionResponseDto } from './ChoiceSectionResponseDto';
import { MultiChoiceSectionResponseDto } from './MultiChoiceSectionResponseDto';
import { AnswerSectionResponseDto } from './AnswerSectionResponseDto';
import { ShortAnswerSectionResponseDto } from './ShortAnswerSectionResponseDto';
import { PermutationSectionResponseDto } from './PermutationSectionResponseDto';
import { CodeSectionResponseDto } from './CodeSectionResponseDto';
import { MappingSectionResponseDto } from './MappingSectionResponseDto';
import { MediaSectionResponseDto } from './MediaSectionResponceDto';
import { FileSectionResponseDto } from './FileSectionResponseDto';

export type AllSectionsResponseDto =
  | CourseTextSectionResponseDto
  | ChoiceSectionResponseDto
  | MultiChoiceSectionResponseDto
  | AnswerSectionResponseDto
  | ShortAnswerSectionResponseDto
  | PermutationSectionResponseDto
  | CodeSectionResponseDto
  | MappingSectionResponseDto
  | MediaSectionResponseDto
  | FileSectionResponseDto;
