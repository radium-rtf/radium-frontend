export interface UpdateCourseFileSectionRequestDto {
  sectionId: string;
  file: {
    fileTypes: string[];
    question: string;
  };
}
