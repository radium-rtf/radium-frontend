import { SectionResponseDto } from './CourseSectionResponseDto';

export interface CourseMediaSectionResponseDto extends SectionResponseDto {
  type: 'media';
  file: {
    location: string;
    name: string;
    sizeInKiB: number;
    type: string;
  };
}
