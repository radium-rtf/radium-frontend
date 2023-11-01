import { CourseResponseDto } from '@/entities/Course';
import { emptyApi } from '@/shared';
import { DeleteModuleRequestDto } from '../model/deleteModuleRequestDto';
import { UpdateModuleNameRequestDto } from '../model/updateModuleNameRequestDto';

const moduleApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteModule: builder.mutation<undefined, DeleteModuleRequestDto>({
      query: ({ id, ...body }) => ({
        url: `/module/${id}`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: () => ['courses'],
    }),
    updateModuleName: builder.mutation<
      CourseResponseDto['modules'][0],
      UpdateModuleNameRequestDto
    >({
      query: ({ id, ...body }) => ({
        url: `/module/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (res) => [{ type: 'courses', id: res?.id }, 'courses'],
    }),
  }),
  overrideExisting: true,
});

export const { useDeleteModuleMutation, useUpdateModuleNameMutation } =
  moduleApi;
