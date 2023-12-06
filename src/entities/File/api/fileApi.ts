import { emptyApi } from '@/shared';
import { FileUploadResponseDto } from '../model/FileUploadResponseDto';
import { FileUploadRequestDto } from '../model/FileUploadRequestDto';

export const fileApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<FileUploadResponseDto, FileUploadRequestDto>({
      query: (file) => ({
        url: `/upload`,
        method: 'POST',
        body: file,
      }),
      invalidatesTags: ['files'],
    }),
  }),
});

export const { useUploadFileMutation } = fileApi;
