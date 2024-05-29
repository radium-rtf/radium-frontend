'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
  Progress,
  getNoun,
} from '@/shared';
import { CourseContinue } from '@/features/CourseContinue';
import { CourseResponseDto, useLastCoursePage } from '@/entities/Course';

interface IProps {
  course: CourseResponseDto;
}

export const AssignedCourseCard: FC<IProps> = ({ course }) => {
  const { name, logo, id, slug, score, maxScore, shortDescription } = course;

  const { nextPageName } = useLastCoursePage(id);

  return (
    <Card className='relative flex snap-start flex-col transition-all hover:bg-card-hover'>
      <Link className='absolute inset-0 z-0 rounded-lg' href={`c/${slug}`} scroll={false} />
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
          <div className='aspect-square h-[4.5rem] rounded-lg bg-popover' />
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
      <CardContent className='flex-grow'>
        <CardDescription className='line-clamp-4'>{shortDescription}</CardDescription>
      </CardContent>
      <CardFooter className='grow items-end'>
        <div className='flex w-full items-center gap-4'>
          <div className='flex flex-grow items-center gap-2'>
            <Icon className='h-[1.125rem]' type='courses' />
            <span className='flex-grow whitespace-nowrap'>
              {course.modules.length} {getNoun(course.modules.length, 'глава', 'главы', 'глав')}
            </span>
            {nextPageName && <p>Далее: {nextPageName}</p>}
          </div>
          <CourseContinue variant='outline' courseSlug={slug} />
        </div>
      </CardFooter>
    </Card>
  );
};
