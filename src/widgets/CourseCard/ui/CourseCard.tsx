'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react';
import { Card, Icon } from '@/shared';
import { CourseJoin } from '@/features/CourseJoin';
import { CourseResponseDto } from '@/entities/Course';

interface IProps {
  course: CourseResponseDto;
}

export const CourseCard: FC<IProps> = ({ course }) => {
  const { name, shortDescription, logo, id } = course;
  return (
    <Card className='relative transition-all hover:brightness-110'>
      <Link
        className='absolute inset-0'
        href={`courses/${id}`}
        scroll={false}
      />
      <header className='flex w-full items-center gap-4'>
        <Image
          className='h-18 w-18 aspect-square flex-shrink-0 rounded object-cover'
          src={logo || '/defaultProfile.svg'}
          alt={name}
          height={72}
          width={72}
        />
        <h1 className='font-mono text-xl font-bold leading-[normal] text-primary-default'>
          {name}
        </h1>
      </header>
      <p className='flex-grow text-[0.8125rem]'>{shortDescription}</p>
      <footer className='flex items-center gap-2'>
        <div className='flex flex-grow items-center gap-2'>
          <Icon className='h-[1.125rem]' type='courses' />
          {/* <p className='text-[0.8125rem]'>{`${modules.length} тем, 5 месяцев`}</p> */}
        </div>
        <CourseJoin className='relative' courseId={id} />
      </footer>
    </Card>
  );
};
