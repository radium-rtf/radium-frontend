'use client';
import { CourseHeader } from '@/widgets/CourseHeader';
import { useGroupQuery } from '@/entities/Group/api/groupApi';
import { GroupMenu } from '@/widgets/GroupMenu';
import { useAnswersQuery } from '@/entities/Answers';
import { useGetCourseQuery } from '@/entities/Course';

export default function GroupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    groupId: string;
    courseId: string;
  };
}) {
  const { data: course } = useGetCourseQuery(params.courseId);
  const { data: group } = useGroupQuery(params.groupId);
  const { data: answers } = useAnswersQuery({
    groupId: params.groupId,
    course_id: params.courseId,
  });

  return (
    <>
      {course && <CourseHeader logo={course.logo} name={course.name} />}
      <div className='flex flex-grow items-start gap-8 px-12'>
        {course && group && answers && (
          <GroupMenu className='-ml-6' courseId={course.id} group={group} answers={answers} />
        )}
        <div className='w-[75%] flex-grow justify-center'>{children}</div>
      </div>
    </>
  );
}
