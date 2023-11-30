export interface UpdateAnswerSectionRequestDto {
  sectionId: string;
  maxAttempts: number;
  maxScore: number;
  answer: {
    question: string;
  };
}
