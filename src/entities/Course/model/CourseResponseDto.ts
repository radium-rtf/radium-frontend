import { CourseModuleResponseDto } from '@/entities/CourseModule';
import { UserResponseDto } from '@/entities/User';

export interface CourseResponseDto {
  authors: UserResponseDto[];
  coauthors: UserResponseDto[];
  isPublished: boolean;
  isStudent: boolean;
  banner: string;
  description: string;
  id: string;
  links: [
    {
      id: string;
      link: string;
      name: string;
    },
  ];
  logo: string;
  maxScore: number;
  modules: CourseModuleResponseDto[];
  groups:
    | [
        {
          id: string;
          name: string;
          inviteCode: string;
          courses: [];
          students: [];
        },
      ]
    | null;
  name: string;
  score: number;
  shortDescription: string;
  slug: string;
}
