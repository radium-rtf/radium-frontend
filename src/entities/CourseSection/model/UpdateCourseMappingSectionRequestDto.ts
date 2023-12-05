export interface UpdateCourseMappingSectionRequestDto {
  sectionId: string;
  mapping: {
    question: string;
    answer: string[];
    keys: string[];
  };
}
