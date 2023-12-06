export interface UpdateCourseChoiceSectionRequestDto {
  sectionId: string;
  maxAttempts: number;
  maxScore: number;
  choice: {
    answer: string;
    question: string;
    variants: string[];
  };
}
