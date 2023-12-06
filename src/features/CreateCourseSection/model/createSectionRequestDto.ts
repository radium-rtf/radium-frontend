export interface CreateSectionRequestDto {
  answer?: {
    question: string;
  };
  choice?: {
    answer: string;
    question: string;
    variants: string[];
  };
  code?: {
    question: string;
  };
  mapping?: {
    answer: string[];
    keys: string[];
    question: string;
  };
  maxAttempts?: number;
  maxScore?: number;
  multichoice?: {
    answer: string[];
    question: string;
    variants: string[];
  };
  order?: number;
  pageId: string;
  permutation?: {
    answer: string[];
    question: string;
  };
  shortanswer?: {
    answer: string;
    question: string;
  };
  text?: {
    content: string;
  };
}
