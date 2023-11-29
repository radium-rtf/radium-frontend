export interface updateMultiChoiceSectionResponseDto {
  answer: string;
  answers: string[];
  attempts: number;
  content: string;
  id: string;
  keys: string[];
  maxScore: number;
  order: number;
  pageId: string;
  score: number;
  type: 'choice';
  variants: string[];
  verdict: 'OK' | 'WA' | 'WAIT' | '';
}
