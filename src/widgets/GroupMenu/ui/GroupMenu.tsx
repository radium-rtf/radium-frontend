'use client';

import React, { FC } from 'react';
import {
  cn,
  List,
  ListContent,
  ListItem,
  ListSubtitle,
  ListTitle,
  ListIcon,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/shared';
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
  answers: AnswersDto;
  courseId: string;
}

export const GroupMenu: FC<IProps> = ({ group, answers, courseId }) => {
  const params = useParams();
  const { data: session } = useSession();
  const selectedStudentId = params.studentId;

  return (
    <nav
      className={cn(
        'sticky top-28 -ml-6 flex max-h-[calc(100vh-7rem)] w-64 shrink-0 flex-grow-0 flex-col self-start transition-all'
      )}
    >
      <h2 className='px-6 py-4 text-lg font-medium leading-[normal] text-accent'>{group.name}</h2>
      <List className='scrollbar overflow-y-scroll'>
        {[
          <ListItem
            key='Ведомость'
            asChild
            className={cn(
              'hover:border-outlineGeneral hover:bg-whiteLight',
              !selectedStudentId && 'border-outlineGeneral bg-whiteLight'
            )}
          >
            <Link passHref={false} href={`/groups/${group.id}/courses/${courseId}`}>
              <ListIcon className='text-primary' icon='table' />
              <ListTitle>Ведомость</ListTitle>
            </Link>
          </ListItem>,
          ...answers.students.map((student: StudentAnswersDto) => {
            const answersNeedToReview = student.answers.filter(
              (answer) => answer.verdict === 'WAIT'
            ).length;

            return (
              <ListItem
                className={cn(
                  'hover:border-outlineGeneral hover:bg-whiteLight',
                  selectedStudentId === student.user.id && 'border-outlineGeneral bg-whiteLight'
                )}
                asChild
                key={student.user.id}
              >
                <Link
                  href={`/groups/${group.id}/courses/${courseId}/student/${student.user.id}/answers`}
                >
                  <ListIcon asChild>
                    <Avatar className='h-[1.125rem] w-[1.125rem] shrink-0'>
                      <AvatarImage src={student.user.avatar} width={18} height={18} />
                      <AvatarFallback>
                        <Image
                          src={'/defaultProfile.svg'}
                          alt={student.user.name}
                          width={18}
                          height={18}
                        />
                      </AvatarFallback>
                    </Avatar>
                  </ListIcon>
                  <ListContent>
                    <ListTitle>{student.user.name}</ListTitle>
                    {session?.user.roles.isTeacher && (
                      <ListSubtitle className='text-accent'>
                        {answersNeedToReview !== 0 && (
                          <>
                            {answersNeedToReview}
                            {(answersNeedToReview === 1 && ' новое задание') || ' новых задания'}
                          </>
                        )}
                      </ListSubtitle>
                    )}
                  </ListContent>
                </Link>
              </ListItem>
            );
          }),
        ]}
      </List>
    </nav>
  );
};
