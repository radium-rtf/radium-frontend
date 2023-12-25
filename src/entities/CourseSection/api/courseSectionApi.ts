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
import { AllSectionsResponseDto } from '../model/AllSectionsResponseDto';
import { CourseSectionChangeOrderRequestDto } from '../model/CourseSectionChangeOrderRequestDto';
import { arrayMove } from '@dnd-kit/sortable';

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

                // Score change
                if (updatedSection.verdict === 'OK') {
                  if (section.score !== section.maxScore) {
                    draft.score += section.maxScore;
                    section.score += section.maxScore;
                  }
                } else if (updatedSection.verdict === 'WA') {
                  if (section.score === section.maxScore) {
                    draft.score -= section.maxScore;
                    section.score -= section.maxScore;
                  }
                }
                section.verdict = updatedSection.verdict;

                // Attempts change
                if (section.attempts) {
                  section.attempts -= 1;
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
      invalidatesTags: ['courses'],
      async onQueryStarted({ sectionId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedSection } = await queryFulfilled;
          dispatch(
            coursePageApi.util.updateQueryData(
              'getPage',
              updatedSection.pageId,
              (draft) => {
                const section = draft.sections.find((s) => s.id === sectionId)!;
                draft.maxScore -= section.maxScore - updatedSection.maxScore;
                draft.score -= section.score - updatedSection.score;
                Object.assign(section, updatedSection);
              }
            )
          );
        } catch {}
      },
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

                // Score change
                if (updatedSection.verdict === 'OK') {
                  if (section.score !== section.maxScore) {
                    draft.score += section.maxScore;
                    section.score += section.maxScore;
                  }
                } else if (updatedSection.verdict === 'WA') {
                  if (section.score === section.maxScore) {
                    draft.score -= section.maxScore;
                    section.score -= section.maxScore;
                  }
                }
                section.verdict = updatedSection.verdict;

                // Attempts change
                if (section.attempts) {
                  section.attempts -= 1;
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

                // Score change
                if (updatedSection.verdict === 'OK') {
                  if (section.score !== section.maxScore) {
                    draft.score += section.maxScore;
                    section.score += section.maxScore;
                  }
                } else if (updatedSection.verdict === 'WA') {
                  if (section.score === section.maxScore) {
                    draft.score -= section.maxScore;
                    section.score -= section.maxScore;
                  }
                }
                section.verdict = updatedSection.verdict;

                // Attempts change
                if (section.attempts) {
                  section.attempts -= 1;
                }
              }
            )
          );
        } catch {}
      },
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
      invalidatesTags: ['courses'],
      async onQueryStarted({ sectionId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedSection } = await queryFulfilled;
          dispatch(
            coursePageApi.util.updateQueryData(
              'getPage',
              updatedSection.pageId,
              (draft) => {
                const section = draft.sections.find((s) => s.id === sectionId)!;
                draft.maxScore -= section.maxScore - updatedSection.maxScore;
                draft.score -= section.score - updatedSection.score;
                Object.assign(section, updatedSection);
              }
            )
          );
        } catch {}
      },
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

                // Score change
                if (updatedSection.verdict === 'OK') {
                  if (section.score !== section.maxScore) {
                    draft.score += section.maxScore;
                    section.score += section.maxScore;
                  }
                } else if (updatedSection.verdict === 'WA') {
                  if (section.score === section.maxScore) {
                    draft.score -= section.maxScore;
                    section.score -= section.maxScore;
                  }
                }
                section.verdict = updatedSection.verdict;

                // Attempts change
                if (section.attempts) {
                  section.attempts -= 1;
                }
              }
            )
          );
        } catch {}
      },
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

                // Score change
                if (updatedSection.verdict === 'OK') {
                  if (section.score !== section.maxScore) {
                    draft.score += section.maxScore;
                    section.score += section.maxScore;
                  }
                } else if (updatedSection.verdict === 'WA') {
                  if (section.score === section.maxScore) {
                    draft.score -= section.maxScore;
                    section.score -= section.maxScore;
                  }
                }
                section.verdict = updatedSection.verdict;

                // Attempts change
                if (section.attempts) {
                  section.attempts -= 1;
                }
              }
            )
          );
        } catch {}
      },
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
      invalidatesTags: ['courses'],
      async onQueryStarted({ id, answer }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedSection } = await queryFulfilled;
          dispatch(
            coursePageApi.util.updateQueryData(
              'getPage',
              updatedSection.pageId,
              (draft) => {
                const section = draft.sections.find(
                  (s) => s.id === id
                )! as AnswerSectionResponseDto;
                section.answer = answer.answer;

                // Score change
                if (updatedSection.verdict === 'OK') {
                  if (section.score !== section.maxScore) {
                    draft.score += section.maxScore;
                    section.score += section.maxScore;
                  }
                } else if (updatedSection.verdict === 'WA') {
                  if (section.score === section.maxScore) {
                    draft.score -= section.maxScore;
                    section.score -= section.maxScore;
                  }
                }
                section.verdict = updatedSection.verdict;

                // Attempts change
                if (section.attempts) {
                  section.attempts -= 1;
                }
              }
            )
          );
        } catch {}
      },
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
    changeCourseSectionOrder: builder.mutation<
      AllSectionsResponseDto,
      CourseSectionChangeOrderRequestDto
    >({
      query: ({ sectionId, ...rest }) => ({
        url: `/section/${sectionId}/order`,
        method: 'PATCH',
        body: {
          order: rest.order,
        },
      }),
      invalidatesTags: (_1, _2, args) => [{ type: 'pages', id: args.pageId }],
      async onQueryStarted(
        { pageId, sectionId, order },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          coursePageApi.util.updateQueryData('getPage', pageId, (draft) => {
            const newIndex = draft.sections.findIndex((s) => s.order === order);
            const oldIndex = draft.sections.findIndex(
              (s) => s.id === sectionId
            );
            draft.sections = arrayMove(draft.sections, oldIndex, newIndex);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
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
  useChangeCourseSectionOrderMutation,
} = sectionApi;
