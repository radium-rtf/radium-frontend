// Interfaces
export type {
  AnswersDto,
  StudentAnswerDto,
  StudentAnswersDto,
} from './model/answersDto';
export type { AnswersRequestDto } from './model/answersRequestDto';

// UI
export { CheckAnswerSection } from './ui/checkAnswerSection';
export { AnswerSectionInput } from './ui/answerSectionInput';

// Hooks
export { useAnswersQuery, useLazyAnswersQuery } from './api/answerApi';
export { useReviewMutation } from './api/reviewApi';
