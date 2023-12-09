'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react';
import { Card, Icon, Progress } from '@/shared';
import { CourseContinue } from '@/features/CourseContinue';
import { CourseResponseDto, useLastCoursePage } from '@/entities/Course';

interface IProps {
  course: CourseResponseDto;
}

export const AssignedCourseCard: FC<IProps> = ({ course }) => {
  const { name, logo, id, score, maxScore } = course;

  const { nextPageName } = useLastCoursePage(id);

  return (
    <Card className='relative transition-all hover:brightness-110'>
      <Link
        className='absolute inset-0'
        href={`courses/${id}`}
        scroll={false}
      />
      <header className='mb-auto flex w-full gap-4'>
        <Image
          className='h-18 w-18 aspect-square flex-shrink-0 rounded object-cover'
          src={logo || '/defaultProfile.svg'}
          alt={name}
          height={72}
          width={72}
        />
        <div className='flex flex-grow flex-col'>
          <h1 className='my-auto font-mono text-xl font-bold leading-[normal] text-primary-default'>
            {name}
          </h1>
          <Progress
            theme='primary'
            className='justify-items-end'
            percentage={(score / (maxScore || 1)) * 100}
            showPercentage
          />
        </div>
      </header>
      <footer className='flex items-center gap-2 justify-self-end'>
        <div className='flex flex-grow items-center gap-2'>
          <Icon className='h-[1.125rem]' type='courses' />
          {nextPageName && (
            <p className='text-[0.8125rem]'>Далее: {nextPageName}</p>
          )}
        </div>
        <CourseContinue className='relative' courseId={id} />
      </footer>
    </Card>
  );
};
