export interface AnswerResponseDto {
  verdict: 'OK' | 'WA' | 'WAIT' | 'REVIEWED' | '';
  pageId: string;
}
