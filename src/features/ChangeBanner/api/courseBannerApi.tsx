import { emptyApi } from '@/shared';
import { CourseResponseDto } from '@/entities/Course';
import { CourseBannerRequestDto } from '../model/CourseBannerRequestDto';

const courseBannerApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    banner: builder.mutation<CourseResponseDto, CourseBannerRequestDto>({
      query: ({ courseId, ...body }) => ({
        url: `/course/${courseId}`,
        method: 'PUT',
        body: body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  endpoints: { banner },
} = courseBannerApi;
