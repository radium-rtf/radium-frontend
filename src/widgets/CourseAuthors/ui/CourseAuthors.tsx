'use client';
import Image from 'next/image';
import { Card, List } from '@/shared';
import { CourseResponseDto } from '@/entities/Course';
import { CourseEditContext } from '@/features/CourseEditContext';
import { CourseAddCoAuthor } from '@/features/CourseAddCoAuthor';
import React, { FC, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { CourseDeleteCoAuthor } from '@/features/CourseDeleteCoAuthor';

interface IProps {
  courseId: string;
  authors: CourseResponseDto['authors'];
  coauthors: CourseResponseDto['coauthors'];
  isEditAllowed: boolean;
}

export const CourseAuthors: FC<IProps> = ({
  courseId,
  authors,
  coauthors,
  isEditAllowed,
}) => {
  const { isEditing } = useContext(CourseEditContext);
  const session = useSession();

  return (
    <Card className='gap-0'>
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
        {coauthors.map((coauthor) => {
          return (
            <List.Item key={coauthor.id}>
              <List.Icon
                asChild
                className='-m-[0.1875rem] aspect-square h-6 rounded-full object-cover'
              >
                <Image
                  src={coauthor.avatar || '/defaultProfile.svg'}
                  alt={coauthor.name}
                  width={24}
                  height={24}
                />
              </List.Icon>
              <List.Content>
                <List.Title>{coauthor.name}</List.Title>
                <List.Subtitle>{coauthor.email}</List.Subtitle>
              </List.Content>
              {isEditAllowed &&
                isEditing &&
                coauthor.email !== session.data?.user.email && (
                  <CourseDeleteCoAuthor
                    courseId={courseId}
                    coAuthorId={coauthor.id}
                  />
                )}
            </List.Item>
          );
        })}
        {isEditAllowed && isEditing && (
          <CourseAddCoAuthor courseId={courseId} />
        )}
      </List>
    </Card>
  );
};
