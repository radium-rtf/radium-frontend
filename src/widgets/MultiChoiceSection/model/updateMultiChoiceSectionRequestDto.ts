export interface updateMultiChoiceSectionRequestDto {
  sectionId: string;
  multichoice: {
    answer: string[];
    question: string;
    variants: string[];
  };
  maxAttempts: number;
  maxScore: number;
}
