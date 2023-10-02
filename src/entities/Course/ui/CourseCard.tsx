'use client';
import React, { FC } from 'react';
import { Button, Card, Icon } from '@/shared';
import { CourseResponseDto } from '@/entities/Course';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface IProps {
  course: CourseResponseDto;
}

export const CourseCard: FC<IProps> = ({ course }) => {
  const router = useRouter();
  const { name, shortDescription, logo, modules, slug } = course;
  return (
    <Card className='flex flex-col gap-4 rounded-lg'>
      <header className='flex w-full items-center gap-4'>
        <Image
          className='h-18 w-18 aspect-square flex-shrink-0 rounded object-cover'
          src={logo}
          alt={name}
          height={72}
          width={72}
        />
        <div className='flex flex-col gap-3 text-start'>
          <p className='text-sm'>Курс</p>
          <h1 className='text-xl text-accent-primary-200'>{name}</h1>
        </div>
      </header>
      <p className='flex-grow text-sm'>{shortDescription}</p>
      <footer className='flex items-center gap-2'>
        <div className='flex flex-grow items-center gap-2'>
          <Icon className='h-5' type='courses' />
          <p className=''>{`${modules.length} тем, 5 месяцев`}</p>
        </div>
        <Button
          type='button'
          color='accent'
          onClick={() => router.push(`/courses/${slug}`)}
        >
          <Icon className='text-grey-800' type='start' />
        </Button>
      </footer>
    </Card>
  );
};
