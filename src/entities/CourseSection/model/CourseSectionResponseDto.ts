export interface SectionResponseDto {
  id: string;
  pageId: string;
  order: number;
  score: number;
  maxScore: number;
  attempts: number;
  maxAttempts: number;
  type:
    | 'choice'
    | 'multiChoice'
    | 'text'
    | 'shortAnswer'
    | 'answer'
    | 'code'
    | 'permutation'
    | 'mapping'
    | 'media'
    | 'file';
  verdict: 'WA' | 'OK' | 'WAIT' | 'REVIEWED' | '';
}
