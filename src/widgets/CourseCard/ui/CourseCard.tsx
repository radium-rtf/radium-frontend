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
} from '@/shared';
import { CourseJoin } from '@/features/CourseJoin';
import { CourseResponseDto } from '@/entities/Course';

interface IProps {
  course: CourseResponseDto;
}

export const CourseCard: FC<IProps> = ({ course }) => {
  const { name, shortDescription, slug, logo, id } = course;
  return (
    <Card className='relative flex flex-col transition-all hover:bg-card-hover'>
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
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className='flex-grow'>
        <CardDescription className='line-clamp-4'>{shortDescription}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className='flex flex-grow items-center gap-2'>
          <Icon className='h-[1.125rem]' type='courses' />
        </div>
        <CourseJoin courseId={id} />
      </CardFooter>
    </Card>
  );
};
