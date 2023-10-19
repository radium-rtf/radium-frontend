export interface AnswerRequestDto {
  answer?: {
    answer: string;
  };
  choice?: {
    answer: string;
  };
  code?: {
    answer: string;
    lang: string;
  };
  id: string;
  multiChoice?: {
    answer: string[];
  };
  shortAnswer?: {
    answer: string;
  };
  permutation?: {
    answer: string[];
  };
}
