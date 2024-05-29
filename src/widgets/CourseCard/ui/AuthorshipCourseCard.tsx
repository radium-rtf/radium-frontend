'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
} from '@/shared';
import { CourseResponseDto } from '@/entities/Course';
import { CourseDeleteSmall } from '@/features/CourseDelete';

interface IProps {
  course: CourseResponseDto;
}

export const AuthorShipCourseCard: FC<IProps> = ({ course }) => {
  const { name, logo, id, slug, shortDescription, description, banner } = course;

  const isReadyForPublish =
    name !== '' && shortDescription !== '' && description !== '' && logo !== '' && banner !== '';

  return (
    <Card className='relative flex shrink-0 basis-[26.25rem] snap-start flex-col transition-all hover:bg-card-hover'>
      <Link className='absolute inset-0 rounded-lg' href={`c/${slug}`} scroll={false} />
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
        <CardTitle>{name || '<без названия>'}</CardTitle>
      </CardHeader>
      <CardContent className='grow'>
        <CardDescription>{shortDescription || '<без описания>'}</CardDescription>
      </CardContent>
      <CardFooter className='gap-2'>
        <div className='flex flex-grow items-center gap-2'>
          <Icon
            className='h-[1.125rem]'
            type={isReadyForPublish || course.isPublished ? 'success' : 'courses'}
          />
          <p>
            {(course.isPublished && 'Опубликован') ||
              (isReadyForPublish && 'Готов к публикации') ||
              'Черновик'}
          </p>
        </div>
        <CourseDeleteSmall courseId={id} />
        <Button asChild className='z-10' variant='outline' type='button'>
          <Link href={`/c/${slug}/edit`}>
            <Icon type='edit' className='mr-4 shrink-0 text-inherit' />
            <span>Редактировать</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
