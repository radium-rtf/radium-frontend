import { StudentAnswerPage } from '@/widgets/StudentAnswerPage';
import React from 'react';

export default async function Page({
  params,
}: {
  params: {
    groupId: string;
    courseId: string;
    studentId: string;
  };
}) {
  return (
    <main className='m-auto w-[45rem] items-center'>
      <StudentAnswerPage
        studentId={params.studentId}
        groupId={params.groupId}
        courseId={params.courseId}
      />
    </main>
  );
}
