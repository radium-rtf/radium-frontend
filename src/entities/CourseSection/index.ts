// interfaces
export type { SectionResponseDto } from './model/CourseSectionResponseDto';
export type { CourseTextSectionResponseDto as TextSectionResponseDto } from './model/TextSectionResponseDto';
export type { ChoiceSectionResponseDto } from './model/ChoiceSectionResponseDto';
export type { MultiChoiceSectionResponseDto } from './model/MultiChoiceSectionResponseDto';
export type { AnswerSectionResponseDto } from './model/AnswerSectionResponseDto';
export type { ShortAnswerSectionResponseDto } from './model/ShortAnswerSectionResponseDto';
export type { AnswerResponseDto } from './model/AnswerResponseDto';
export type { CodeSectionResponseDto } from './model/CodeSectionResponseDto';
export type { PermutationSectionResponseDto } from './model/PermutationSectionResponseDto';
export type { MappingSectionResponseDto } from './model/MappingSectionResponseDto';

// types
export type { AllSectionsResponseDto } from './model/AllSectionsResponseDto';

// Hooks
export {
  useUpdateCourseTextSectionMutation,
  useAnswerCourseChoiceSectionMutation,
  useUpdateCourseChoiceSectionMutation,
  useAnswerCourseMultiChoiceSectionMutation,
  useUpdateCourseMultiChoiceSectionMutation,
  useAnswerCourseShortAnswerSectionMutation,
  useUpdateCourseShortAnswerSectionMutation,
  useAnswerCoursePermutationsSectionMutation,
  useUpdateCoursePermutationsSectionMutation,
  useAnswerCourseMappingSectionMutation,
  useUpdateCourseMappingSectionMutation,
  useAnswerCourseAnswerSectionMutation,
  useUpdateCourseAnswerSectionMutation,
  useAnswerCourseCodeSectionMutation,
} from './api/courseSectionApi';
