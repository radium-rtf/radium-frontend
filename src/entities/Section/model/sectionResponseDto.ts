export interface SectionResponseDto {
  answer: string;
  answers: string[];
  content: string;
  id: string;
  maxScore: number;
  order: number;
  pageId: string;
  score: number;
  type: 'choice' | 'multiChoice' | 'text' | 'shortAnswer' | 'answer' | 'code ';
  variants: string[];
  verdict: 'WA' | 'OK' | 'WAIT';
}
