'use client';
import { GroupReportTable, useCourseReportQuery } from '@/entities/Group';
import { useGroupQuery } from '@/entities/Group/api/groupApi';

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

  if (!courseReport || !group) {
    return null;
  }

  return (
    <main className='m-auto flex w-[90%] flex-col'>
      <GroupReportTable courseReport={courseReport} />
    </main>
  );
}
