export interface UpdateCourseMultiChoiceSectionRequestDto {
  sectionId: string;
  multichoice: {
    answer: string[];
    question: string;
    variants: string[];
  };
  maxAttempts: number;
  maxScore: number;
}
