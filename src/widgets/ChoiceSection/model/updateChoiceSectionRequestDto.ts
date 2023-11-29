export interface updateChoiceSectionRequestDto {
  sectionId: string;
  maxAttempts: number;
  maxScore: number;
  choice: {
    answer: string;
    question: string;
    variants: string[];
  };
}
