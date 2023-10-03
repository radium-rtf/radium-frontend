import React, { FC } from 'react';
import { Button, Card, Icon } from '@/shared';
import { CourseResponseDto } from '@/entities/Course';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  course: CourseResponseDto;
}

export const CourseCard: FC<IProps> = ({ course }) => {
  const { name, shortDescription, logo, modules, slug } = course;
  return (
    <Card>
      <header className='flex w-full items-center gap-4'>
        <Image
          className='h-18 w-18 aspect-square flex-shrink-0 rounded object-cover'
          src={logo}
          alt={name}
          height={72}
          width={72}
        />
        <h1 className='font-mono text-xl font-bold leading-[normal] text-primary-default'>
          {name}
        </h1>
      </header>
      <p className='flex-grow text-sm'>{shortDescription}</p>
      <footer className='flex items-center gap-2'>
        <div className='flex flex-grow items-center gap-2'>
          <Icon className='h-[1.125rem]' type='courses' />
          <p className='text-[0.8125rem]'>{`${modules.length} тем, 5 месяцев`}</p>
        </div>
        <Button asChild color='outlined'>
          <Link href={`/courses/${slug}`}>
            <Icon className='text-grey-800 text-inherit' type='start' />
            <p>Начать</p>
          </Link>
        </Button>
      </footer>
    </Card>
  );
};
