'use client';

import React, { FC } from 'react';
import { cn, List } from '@/shared';
import Link from 'next/link';
import Image from 'next/image';
import { AnswersDto } from '@/entities/Answers';
import { StudentAnswersDto } from '@/entities/Answers/model/answersDto';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface IProps {
  group: {
    name: string;
    id: string;
  };
  className?: string;
  answers: AnswersDto;
  courseId: string;
}

export const GroupMenu: FC<IProps> = ({ group, className, answers, courseId }) => {
  const params = useParams();
  const { data: session } = useSession();
  const selectedStudentId = params.studentId;

  return (
    <nav className={cn('sticky top-[8.625rem] w-64', className)}>
      <h2 className='text-accent-secondary-300 px-6 py-4 text-xl font-bold leading-[normal]'>
        {group.name}
      </h2>
      <List>
        {[
          <List.Item
            key='Ведомость'
            asChild
            className={cn(
              'font-mono text-[0.8125rem] font-normal ',
              'rounded-lg ',
              'select-none',
              !selectedStudentId && 'bg-text-primary border border-white/10 bg-opacity-5'
            )}
          >
            <Link passHref={false} href={`/groups/${group.id}/courses/${courseId}`}>
              <List.Icon className='text-accent-primary-200' icon='table' />
              <List.Title className='text-lg'>Ведомость</List.Title>
            </Link>
          </List.Item>,
          ...answers.students.map((student: StudentAnswersDto) => {
            const answersNeedToReview = student.answers.filter(
              (answer) => answer.verdict === 'WAIT'
            ).length;

            return (
              <List.Item asChild key={student.user.id}>
                <Link
                  className={cn(
                    'flex',
                    'rounded-lg border border-transparent',
                    'transition-colors',
                    'hover:border-white/10 hover:bg-white/5',
                    selectedStudentId === student.user.id &&
                      'bg-text-primary border border-white/10 bg-opacity-5'
                  )}
                  href={`/groups/${group.id}/courses/${courseId}/student/${student.user.id}/answers`}
                >
                  <List.Icon
                    asChild
                    className='-m-[0.1875rem] aspect-square h-6 rounded-full object-cover'
                  >
                    <Image
                      src={student.user.avatar || '/defaultProfile.svg'}
                      alt={student.user.name}
                      width={24}
                      height={24}
                    />
                  </List.Icon>
                  <List.Content>
                    <List.Title className='font-mono text-[0.8125rem] font-normal'>
                      {student.user.name}
                    </List.Title>
                    {session?.user.roles.isTeacher && (
                      <List.Subtitle className='text-accent-secondary-300 font-mono text-[0.625rem] font-normal'>
                        {answersNeedToReview !== 0 && (
                          <>
                            {answersNeedToReview}
                            {(answersNeedToReview === 1 && ' новое задание') || ' новых задания'}
                          </>
                        )}
                      </List.Subtitle>
                    )}
                  </List.Content>
                </Link>
              </List.Item>
            );
          }),
        ]}
      </List>
    </nav>
  );
};
