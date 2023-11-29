export interface UpdateShortAnswerSectionRequestDto {
  sectionId: string;
  maxAttempts: number;
  maxScore: number;
  shortanswer: {
    answer: string;
    question: string;
  };
}
