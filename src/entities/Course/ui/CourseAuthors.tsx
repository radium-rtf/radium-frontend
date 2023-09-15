import React, { FC } from 'react';
import { Card } from '@/shared';
import { CourseResponseDto } from '@/entities/Course';
import Image from 'next/image';

interface IProps {
  authors: CourseResponseDto['authors'];
}

export const CourseAuthors: FC<IProps> = ({ authors }) => {
  return (
    <Card className='rounded-lg'>
      <h1 className='text-xl mb-6 text-accent-primary-200'>Авторы курса</h1>
      <ul className='flex flex-col gap-4'>
        {authors.map((author) => {
          return (
            <li key={author.id} className='flex items-center gap-4'>
              <Image
                src={author.avatar || '/defaultProfile.svg'}
                alt={author.name}
                height={24}
                width={24}
                className='aspect-square h-6 rounded-full'
              />
              <p>{author.name}</p>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
