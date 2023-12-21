import React, { FC } from 'react';
import { Card, List } from '@/shared';
import Image from 'next/image';
import { CourseResponseDto } from '../model/CourseResponseDto';

interface IProps {
  authors: CourseResponseDto['authors'];
}

export const CourseAuthors: FC<IProps> = ({ authors }) => {
  return (
    <Card className='gap-0 rounded-lg'>
      <h1 className='mb-4 font-mono text-xl font-bold leading-[normal] text-primary-default'>
        Авторы курса
      </h1>
      <List className='-mx-6 flex flex-col'>
        {authors.map((author) => {
          return (
            <List.Item key={author.id}>
              <List.Icon
                asChild
                className='-m-[0.1875rem] aspect-square h-6 rounded-full object-cover'
              >
                <Image
                  src={author.avatar || '/defaultProfile.svg'}
                  alt={author.name}
                  width={24}
                  height={24}
                />
              </List.Icon>
              <List.Content>
                <List.Title>{author.name}</List.Title>
                <List.Subtitle>{author.email}</List.Subtitle>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </Card>
  );
};
