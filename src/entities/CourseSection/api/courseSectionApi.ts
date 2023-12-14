import { emptyApi } from '@/shared';
import { UpdateCourseTextSectionRequestDto } from '../model/UpdateCourseTextSectionRequestDto';
import { CourseTextSectionResponseDto } from '../model/TextSectionResponseDto';
import { AnswerResponseDto } from '../model/AnswerResponseDto';
import { AnswerCourseChoiceSectionRequestDto } from '../model/AnswerCourseChoiceSectionRequestDto';
import { ChoiceSectionResponseDto } from '../model/ChoiceSectionResponseDto';
import { UpdateCourseChoiceSectionRequestDto } from '../model/UpdateCourseChoiceSectionRequestDto';
import { AnswerCourseMultiChoiceSectionRequestDto } from '../model/AnswerCourseMultiChoiceSectionRequestDto';
import { UpdateCourseMultiChoiceSectionRequestDto } from '../model/UpdateCourseMultiChoiceSectionRequestDto';
import { MultiChoiceSectionResponseDto } from '../model/MultiChoiceSectionResponseDto';
import { AnswerCourseShortAnswerSectionRequestDto } from '../model/AnswerCourseShortAnswerSectionRequestDto';
import { ShortAnswerSectionResponseDto } from '../model/ShortAnswerSectionResponseDto';
import { UpdateCourseShortAnswerSectionRequestDto } from '../model/UpdateCourseShortAnswerSectionRequestDto';
import { AnswerCoursePermutationsSectionRequestDto } from '../model/AnswerCoursePermutationsSectionRequestDto';
import { PermutationSectionResponseDto } from '../model/PermutationSectionResponseDto';
import { UpdateCoursePermutationsSectionRequestDto } from '../model/UpdateCoursePermutationsSectionRequestDto';
import { MappingSectionResponseDto } from '../model/MappingSectionResponseDto';
import { AnswerCourseMappingSectionRequestDto } from '../model/AnswerCourseMappingSectionRequestDto';
import { UpdateCourseMappingSectionRequestDto } from '../model/UpdateCourseMappingSectionRequestDto';
import { AnswerCourseAnswerSectionRequestDto } from '../model/AnswerCourseAnswerSectionRequestDto';
import { AnswerSectionResponseDto } from '../model/AnswerSectionResponseDto';
import { UpdateCourseAnswerSectionRequestDto } from '../model/UpdateCourseAnswerSectionRequestDto';
import { AnswerCourseCodeSectionRequestDto } from '../model/AnswerCourseCodeSectionRequestDto';
import { coursePageApi } from '@/entities/CoursePage';

const sectionApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    updateCourseTextSection: builder.mutation<
      CourseTextSectionResponseDto,
      UpdateCourseTextSectionRequestDto
    >({
      query: ({ sectionId, ...body }) => ({
        url: `/section/${sectionId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'pages', id: result.pageId },
              { type: 'pages', id: 'LIST' },
              'courses',
            ]
          : [{ type: 'pages', id: 'LIST' }, 'pages'],
    }),
    answerCourseChoiceSection: builder.mutation<
      AnswerResponseDto,
      AnswerCourseChoiceSectionRequestDto
    >({
      query: (body) => ({
        url: `/answer`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['courses'],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedSection } = await queryFulfilled;
          dispatch(
            coursePageApi.util.updateQueryData(
              'getPage',
              updatedSection.pageId,
              (draft) => {
                const section = draft.sections.find((s) => s.id === id)!;

                if (
                  section.verdict === 'OK' &&
                  updatedSection.verdict !== 'OK'
                ) {
                  draft.score -= section.maxScore;
                }
                if (
                  section.verdict === 'WA' &&
                  updatedSection.verdict === 'OK'
                ) {
                  draft.score += section.maxScore;
                }
                section.verdict = updatedSection.verdict;
                if (updatedSection.verdict === 'OK') {
                  section.score = section.maxScore;
                }
              }
            )
          );
        } catch {}
      },
    }),
    updateCourseChoiceSection: builder.mutation<
      ChoiceSectionResponseDto,
      UpdateCourseChoiceSectionRequestDto
    >({
      query: ({ sectionId, ...body }) => ({
        url: `/section/${sectionId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'pages', id: result.pageId },
              { type: 'pages', id: 'LIST' },
              'courses',
            ]
          : [{ type: 'pages', id: 'LIST' }, 'pages'],
    }),
    answerCourseMultiChoiceSection: builder.mutation<
      AnswerResponseDto,
      AnswerCourseMultiChoiceSectionRequestDto
    >({
      query: (body) => ({
        url: `/answer`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['courses'],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedSection } = await queryFulfilled;
          dispatch(
            coursePageApi.util.updateQueryData(
              'getPage',
              updatedSection.pageId,
              (draft) => {
                const section = draft.sections.find((s) => s.id === id)!;

                if (
                  section.verdict === 'OK' &&
                  updatedSection.verdict !== 'OK'
                ) {
                  draft.score -= section.maxScore;
                }
                if (
                  section.verdict === 'WA' &&
                  updatedSection.verdict === 'OK'
                ) {
                  draft.score += section.maxScore;
                }
                section.verdict = updatedSection.verdict;
                if (updatedSection.verdict === 'OK') {
                  section.score = section.maxScore;
                }
              }
            )
          );
        } catch {}
      },
    }),
    updateCourseMultiChoiceSection: builder.mutation<
      MultiChoiceSectionResponseDto,
      UpdateCourseMultiChoiceSectionRequestDto
    >({
      query: ({ sectionId, ...body }) => ({
        url: `/section/${sectionId}`,
        body: body,
        method: 'PUT',
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'pages', id: result.pageId },
              { type: 'pages', id: 'LIST' },
              'courses',
            ]
          : [{ type: 'pages', id: 'LIST' }, 'pages'],
    }),
    answerCourseShortAnswerSection: builder.mutation<
      AnswerResponseDto,
      AnswerCourseShortAnswerSectionRequestDto
    >({
      query: (body) => ({
        url: `/answer`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['pages', 'courses'],
    }),
    updateCourseShortAnswerSection: builder.mutation<
      ShortAnswerSectionResponseDto,
      UpdateCourseShortAnswerSectionRequestDto
    >({
      query: ({ sectionId, ...body }) => ({
        url: `/section/${sectionId}`,
        body: body,
        method: 'PUT',
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'pages', id: result.pageId },
              { type: 'pages', id: 'LIST' },
              'courses',
            ]
          : [{ type: 'pages', id: 'LIST' }, 'pages'],
    }),
    answerCoursePermutationsSection: builder.mutation<
      AnswerResponseDto,
      AnswerCoursePermutationsSectionRequestDto
    >({
      query: (body) => ({
        url: '/answer',
        body: body,
        method: 'POST',
      }),
      invalidatesTags: ['pages', 'courses'],
    }),
    updateCoursePermutationsSection: builder.mutation<
      PermutationSectionResponseDto,
      UpdateCoursePermutationsSectionRequestDto
    >({
      query: ({ sectionId, ...body }) => ({
        url: `/section/${sectionId}`,
        body: body,
        method: 'PUT',
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'pages', id: result.pageId },
              { type: 'pages', id: 'LIST' },
              'courses',
            ]
          : [{ type: 'pages', id: 'LIST' }, 'pages'],
    }),
    answerCourseMappingSection: builder.mutation<
      AnswerResponseDto,
      AnswerCourseMappingSectionRequestDto
    >({
      query: (body) => ({
        url: '/answer',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['pages', 'courses'],
    }),
    updateCourseMappingSection: builder.mutation<
      MappingSectionResponseDto,
      UpdateCourseMappingSectionRequestDto
    >({
      query: ({ sectionId, ...body }) => ({
        url: `/section/${sectionId}`,
        body,
        method: 'PUT',
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'pages', id: result.pageId },
              { type: 'pages', id: 'LIST' },
              'courses',
            ]
          : [{ type: 'pages', id: 'LIST' }, 'pages'],
    }),
    answerCourseAnswerSection: builder.mutation<
      AnswerResponseDto,
      AnswerCourseAnswerSectionRequestDto
    >({
      query: (body) => ({
        url: `/answer`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['pages', 'courses'],
    }),
    updateCourseAnswerSection: builder.mutation<
      AnswerSectionResponseDto,
      UpdateCourseAnswerSectionRequestDto
    >({
      query: ({ sectionId, ...body }) => ({
        url: `/section/${sectionId}`,
        body: body,
        method: 'PUT',
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'pages', id: result.pageId },
              { type: 'pages', id: 'LIST' },
              'courses',
            ]
          : [{ type: 'pages', id: 'LIST' }, 'pages'],
    }),
    answerCourseCodeSection: builder.mutation<
      AnswerResponseDto,
      AnswerCourseCodeSectionRequestDto
    >({
      query: (body) => ({
        url: '/answer',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: (response, _, request) => [
        { type: 'pages', id: request.id },
        'pages',
        'courses',
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
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
} = sectionApi;
