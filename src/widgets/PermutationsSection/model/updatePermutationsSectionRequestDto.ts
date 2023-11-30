export interface UpdatePermutationsSectionRequestDto {
  sectionId: string;
  maxScore: number;
  maxAttempts: number;
  permutation: {
    answer: string[];
    question: string;
  };
}
