import { Role } from '@/entities/Group/model/groupDto';
import { ModuleDto } from '@/entities/Course/model/moduleDto';
import { LinkDto } from '@/entities/Course/model/linkDto';
import { AuthorDto } from '@/entities/Course/model/authorDto';

export interface AnswersDto {
  courses: [
    {
      authors: AuthorDto[];
      banner: string;
      description: string;
      id: string;
      links: LinkDto[];
      logo: string;
      maxScore: number;
      modules: ModuleDto[];
      name: string;
      score: number;
      shortDescription: string;
      slug: string;
    },
  ];
  id: string;
  inviteCode: string;
  name: string;
  students: StudentAnswersDto[];
}

export interface StudentAnswersDto {
  answers: StudentAnswerDto[];
  maxScore: number;
  score: number;
  user: {
    avatar: string;
    email: string;
    id: string;
    name: string;
    roles: Role;
  };
  withoutReview: number;
}

export interface StudentAnswerDto {
  answer: string;
  answers: string[];
  createdAt: string;
  id: string;
  language: string;
  review?: {
    answerId: string;
    reviewerId: string;
    score: number;
    comment: string;
  };
  section: {
    answer: string;
    answers: [string];
    content: string;
    id: string;
    keys: [string];
    maxScore: number;
    order: number;
    pageId: string;
    score: number;
    type: string;
    variants: string[];
    verdict: 'OK' | 'WAIT' | 'REVIEWED';
    file?: {
      location: string;
      name: string;
      sizeInKiB: number;
      type: string;
    };
  };
  type: string;
  verdict: 'OK' | 'WAIT' | 'REVIEWED';
}
