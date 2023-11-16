import { emptyApi } from '@/shared';
import { CourseReportDto } from '..';
import { GroupDto } from '../model/groupDto';

const groupApi = emptyApi.injectEndpoints({
    endpoints: (builder) => ({
        courseReport: builder.query<CourseReportDto, { groupId: string, courseId: string }>({
            query: ({ groupId, courseId }): { url: string; } => ({
                url: `/group/report/${groupId}/${courseId}`,
            })
        }),

        group: builder.query<GroupDto,  string>({
            query: (groupId): { url: string; } => ({
                url: `/group/${groupId}`,
            })
        }),
    }),
});

export const {
    useCourseReportQuery,
    useLazyCourseReportQuery,
    useGroupQuery,
    useLazyGroupQuery
} = groupApi;
