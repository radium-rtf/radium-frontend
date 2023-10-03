import React, { FC } from 'react';
import { Card } from '@/shared';
import { CourseResponseDto } from '@/entities/Course';
import Image from 'next/image';

interface IProps {
  authors: CourseResponseDto['authors'];
}

export const CourseAuthors: FC<IProps> = ({ authors }) => {
  return (
    <Card className='gap-0 rounded-lg'>
      <h1 className='mb-6 font-mono text-xl font-bold leading-[normal] text-primary-default'>
        Авторы курса
      </h1>
      <ul className='flex flex-col gap-4'>
        {authors.map((author) => {
          return (
            <li key={author.id} className='flex items-center gap-4'>
              <Image
                src={author.avatar || '/defaultProfile.svg'}
                alt={author.name}
                height={48}
                width={48}
                className='aspect-square h-12 shrink-0 rounded-full object-cover'
              />
              <p>{author.name}</p>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
