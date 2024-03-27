import { SectionResponseDto } from './CourseSectionResponseDto';

export interface MediaSectionResponseDto extends SectionResponseDto {
  type: 'media';
  file: {
    location: string;
    name: string;
    sizeInKiB: number;
    type: string;
  };
}
