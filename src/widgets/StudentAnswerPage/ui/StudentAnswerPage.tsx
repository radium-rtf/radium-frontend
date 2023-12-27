'use client';

import React, { FC } from 'react';
import { StudentAnswersDto } from '@/entities/Answers/model/answersDto';
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
    <div className='mx-auto max-w-[45rem]'>
      <h1 className='text-accent-primary-200 px-6 font-mono text-[3rem] font-bold'>
        Задания от {studentAnswers.user.name}
      </h1>
      {needToReview.map((answer) => (
        <CheckAnswerSection
          key={answer.id}
          reviewed={!!answer.review}
          studentAnswer={answer}
          className='my-[2rem]'
        />
      ))}
      {reviewed.length !== 0 && (
        <h1 className='text-accent-primary-200 px-6 font-mono text-[2rem] font-bold'>Проверено</h1>
      )}
      {reviewed.map((answer) => (
        <CheckAnswerSection key={answer.id} reviewed studentAnswer={answer} className='my-[2rem]' />
      ))}
    </div>
  );
};
