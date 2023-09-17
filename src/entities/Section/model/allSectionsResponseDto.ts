import { ChoiceSectionResponseDto } from './choiceSectionResponseDto';
import { TextSectionResponseDto } from './textSectionResponseDto';

export type AllSectionsResponseDto =
  | TextSectionResponseDto
  | ChoiceSectionResponseDto;
