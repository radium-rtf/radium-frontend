import { SectionResponseDto } from './CourseSectionResponseDto';
import { Role } from '@/entities/Group/model/groupDto';

export interface CodeSectionResponseDto extends SectionResponseDto {
  type: 'code';
  content: string;
  answer: string;
  languages: string[];
  review?: {
    answerId: string;
    reviewer: {
      id: string;
      email: string;
      name: string;
      avatar: string;
      roles?: Role[];
    };
    score: number;
    comment: string;
  };
}
