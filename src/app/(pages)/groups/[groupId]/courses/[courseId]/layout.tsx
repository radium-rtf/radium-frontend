'use client';
import { useGroupQuery } from '@/entities/Group/api/groupApi';
import { GroupMenu } from '@/widgets/GroupMenu';
import { useAnswersQuery } from '@/entities/Answers';
import { useGetCourseQuery } from '@/entities/Course';
import { Header } from '@/widgets/Header';
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from '@/widgets/Footer';

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
      {course && (
        <Header>
          <Link href={`/courses/${course.id}`} className='flex items-center gap-6'>
            {course.logo ? (
              <Image
                src={course.logo}
                alt={course.name}
                width={48}
                height={48}
                className='h-12 w-12 rounded-[0.5rem] object-cover'
              />
            ) : (
              <div className='h-12 w-12 rounded-[0.5rem] bg-popover object-cover'></div>
            )}
            <h1 className='font-NTSomic text-4xl font-bold text-primary'>{course.name}</h1>
          </Link>
        </Header>
      )}
      <div className='flex flex-grow items-start gap-8 px-12 pb-8 pt-[8.25rem]'>
        {course && group && answers && (
          <GroupMenu courseId={course.id} group={group} answers={answers} />
        )}
        <div className='w-[75%] flex-grow justify-center'>{children}</div>
      </div>
      <Footer />
    </>
  );
}
