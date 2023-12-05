export interface UpdateCourseTextSectionRequestDto {
  sectionId: string;
  text: {
    content: string;
  };
}
