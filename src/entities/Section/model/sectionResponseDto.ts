export interface SectionResponseDto {
  id: string;
  pageId: string;
  order: number;
  score: number;
  maxScore: number;
  type:
    | 'choice'
    | 'multiChoice'
    | 'text'
    | 'shortAnswer'
    | 'answer'
    | 'code'
    | 'permutation';
  verdict: 'WA' | 'OK' | 'WAIT' | '';
}
