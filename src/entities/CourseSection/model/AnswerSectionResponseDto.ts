import { SectionResponseDto } from './CourseSectionResponseDto';
import { Role } from '@/entities/Group/model/groupDto';

export interface AnswerSectionResponseDto extends SectionResponseDto {
  type: 'answer';
  content: string;
  answer: string;
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
