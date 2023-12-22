export interface UpdateCourseMappingSectionRequestDto {
  sectionId: string;
  maxAttempts: number;
  maxScore: number;
  mapping: {
    question: string;
    answer: string[];
    keys: string[];
  };
}
