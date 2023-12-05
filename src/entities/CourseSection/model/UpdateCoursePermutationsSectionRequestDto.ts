export interface UpdateCoursePermutationsSectionRequestDto {
  sectionId: string;
  maxScore: number;
  maxAttempts: number;
  permutation: {
    answer: string[];
    question: string;
  };
}
