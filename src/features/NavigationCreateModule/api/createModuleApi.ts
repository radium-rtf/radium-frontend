import { CourseResponseDto } from '@/entities/Course';
import { emptyApi } from '@/shared';
import { CreateModuleRequestDto } from '../model/createModuleRequestDto';

const moduleEditApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    createModule: builder.mutation<
      CourseResponseDto['modules'][0],
      CreateModuleRequestDto
    >({
      query: (body) => ({
        url: '/module',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: (res) => [{ type: 'courses', id: res?.id }, 'courses'],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateModuleMutation } = moduleEditApi;
