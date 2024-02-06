'use client';

import React, { FC } from 'react';
import { StudentAnswersDto } from '@/entities/Answers';
import { CheckAnswerSection, useAnswersQuery } from '@/entities/Answers';
import { useSession } from 'next-auth/react';

interface IProps {
  studentId: string;
  groupId: string;
  courseId: string;
}

export const StudentAnswerPage: FC<IProps> = ({ studentId, groupId, courseId }) => {
  const { data: answers } = useAnswersQuery({
    groupId: groupId,
    course_id: courseId,
  });
  const { data: session } = useSession();
  if (!session?.user.roles.isTeacher) {
    return null;
  }

  if (!answers) {
    return null;
  }

  const [studentAnswers] = answers.students.filter(
    (student: StudentAnswersDto) => student.user.id === studentId
  );

  const needToReview = studentAnswers.answers.filter(
    (studentAnswer) => studentAnswer.verdict === 'WAIT'
  );
  const reviewed = studentAnswers.answers.filter(
    (studentAnswer) => studentAnswer.verdict === 'REVIEWED'
  );

  return (
    <div className='mx-auto flex max-w-[45rem] flex-col gap-8'>
      <h1 className='px-6 font-NTSomic text-2xl font-bold text-primary'>
        Задания от {studentAnswers.user.name}
      </h1>
      {needToReview.map((answer) => (
        <CheckAnswerSection key={answer.id} reviewed={!!answer.review} studentAnswer={answer} />
      ))}
      {reviewed.length !== 0 && (
        <h1 className='px-6 font-NTSomic text-[2rem] font-bold text-primary'>Проверено</h1>
      )}
      {reviewed.map((answer) => (
        <CheckAnswerSection key={answer.id} reviewed studentAnswer={answer} />
      ))}
    </div>
  );
};
