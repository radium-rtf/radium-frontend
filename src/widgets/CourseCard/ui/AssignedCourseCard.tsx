'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
  Progress,
} from '@/shared';
import { CourseContinue } from '@/features/CourseContinue';
import { CourseResponseDto, useLastCoursePage } from '@/entities/Course';

interface IProps {
  course: CourseResponseDto;
}

export const AssignedCourseCard: FC<IProps> = ({ course }) => {
  const { name, logo, id, score, maxScore } = course;

  const { nextPageName } = useLastCoursePage(id);

  return (
    <Card className='hover:bg-card-hover relative flex flex-col transition-all'>
      <Link
        className='absolute inset-0 z-0'
        href={`courses/${id}`}
        scroll={false}
      />
      <CardHeader className='flex-row items-center gap-4 space-y-0'>
        {logo ? (
          <Image
            className='h-18 w-18 aspect-square flex-shrink-0 rounded-lg object-cover'
            src={logo}
            alt={name}
            height={72}
            width={72}
          />
        ) : (
          <div className='aspect-square h-[4.5rem] rounded-lg bg-background-overlay' />
        )}
        <div className='flex flex-grow flex-col'>
          <CardTitle>{name}</CardTitle>
          <Progress
            theme='primary'
            className='justify-items-end'
            percentage={(score / (maxScore || 1)) * 100}
            showPercentage
          />
        </div>
      </CardHeader>
      <CardFooter className='grow items-end'>
        <div className='flex w-full items-center gap-4'>
          <div className='flex flex-grow items-center gap-2'>
            <Icon className='h-[1.125rem]' type='courses' />
            {nextPageName && (
              <p className='text-[0.8125rem]'>Далее: {nextPageName}</p>
            )}
          </div>
          <CourseContinue courseId={id} />
        </div>
      </CardFooter>
    </Card>
  );
};
