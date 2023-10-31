import { CourseResponseDto } from '@/entities/Course';
import { emptyApi } from '@/shared';
import { UpdateModuleNameRequestDto } from '../model/updateModuleNameRequestDto';

const moduleEditApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    updateName: builder.mutation<
      CourseResponseDto['modules'][0],
      UpdateModuleNameRequestDto
    >({
      query: ({ id, ...body }) => ({
        url: `/page/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (res, err, arg) => [
        { type: 'pages', id: arg.id },
        'courses',
      ],
      // async onQueryStarted({ id, name }, { dispatch, queryFulfilled }) {
      //   const pagePatchResult = dispatch(
      //     emptyApi.util.updateQueryData(
      //       'page',
      //       id,
      //       (draft: PageResponseDto) => {
      //         draft.name = name;
      //       }
      //     )
      //   );
      //   const coursePatchResult = dispatch(
      //     emptyApi.util.updateQueryData(
      //       'course',
      //       undefined,
      //       (draft: CourseResponseDto) => {
      //         const moduleIndex = draft.modules.findIndex(
      //           (m) => m.pages.findIndex((p) => p.id === id) !== -1
      //         );
      //         console.log(
      //           draft.modules[moduleIndex].pages.find((p) => p.id === id)
      //         );
      //         draft.modules[moduleIndex].pages.find((p) => p.id === id)!.name =
      //           name;
      //       }
      //     )
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     pagePatchResult.undo();
      //     coursePatchResult.undo();
      //   }
      // },
    }),
  }),
  overrideExisting: true,
});

export const { useUpdateNameMutation } = moduleEditApi;
