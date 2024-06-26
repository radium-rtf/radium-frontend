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
export type { MediaSectionResponseDto } from './model/MediaSectionResponceDto';
export type { FileSectionResponseDto } from './model/FileSectionResponseDto';
// types
export type { AllSectionsResponseDto } from './model/AllSectionsResponseDto';

// Hooks
export {
  useUpdateCourseTextSectionMutation,
  useUpdateCourseMediaSectionMutation,
  useUpdateCourseFileSectionMutation,
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
  useChangeCourseSectionOrderMutation,
} from './api/courseSectionApi';

// UI
export { CourseSectionHeader } from './ui/CourseSectionHeader';
export { CourseSectionFooter } from './ui/CourseSectionFooter';

export { CourseSectionHeaderEdit } from './ui/CourseSectionHeaderEdit';
export { CourseSectionFooterEdit } from './ui/CourseSectionFooterEdit';
