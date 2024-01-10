'use client';
import { GroupReportTable, useCourseReportQuery } from '@/entities/Group';
import { useGroupQuery } from '@/entities/Group/api/groupApi';
import { useUpdateTitle } from '@/shared';

export default function Page({
  params,
}: {
  params: {
    groupId: string;
    courseId: string;
  };
}) {
  const { data: courseReport } = useCourseReportQuery({
    groupId: params.groupId,
    courseId: params.courseId,
  });
  const { data: group } = useGroupQuery(params.groupId);

  useUpdateTitle(group?.name);

  if (!courseReport || !group) {
    return null;
  }

  return (
    <main className='scrollbar m-auto flex w-[90%] flex-col'>
      <GroupReportTable courseReport={courseReport} />
    </main>
  );
}
