'use client';
import Image from 'next/image';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  List,
  ListContent,
  ListIcon,
  ListItem,
  ListSubtitle,
  ListTitle,
} from '@/shared';
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
      <CardHeader>
        <CardTitle>Авторы курса</CardTitle>
      </CardHeader>
      <CardContent>
        <List className='-mx-6 flex flex-col'>
          {authors.map((author) => {
            return (
              <ListItem key={author.id}>
                <ListIcon
                  asChild
                  className='-m-[0.1875rem] aspect-square h-6 rounded-full object-cover'
                >
                  <Avatar className='h-6 w-6'>
                    <AvatarImage
                      className='h-6 w-6'
                      src={author.avatar}
                      alt={author.name}
                    />
                    <AvatarFallback>
                      <Image
                        src='/defaultProfile.svg'
                        width={24}
                        height={24}
                        alt={author.name}
                      />
                    </AvatarFallback>
                  </Avatar>
                </ListIcon>
                <ListContent>
                  <ListTitle>{author.name}</ListTitle>
                  <ListSubtitle>{author.email}</ListSubtitle>
                </ListContent>
              </ListItem>
            );
          })}
          {coauthors.map((coauthor) => {
            return (
              <ListItem key={coauthor.id}>
                <ListIcon
                  asChild
                  className='-m-[0.1875rem] aspect-square h-6 rounded-full object-cover'
                >
                  <Image
                    src={coauthor.avatar || '/defaultProfile.svg'}
                    alt={coauthor.name}
                    width={24}
                    height={24}
                  />
                </ListIcon>
                <ListContent>
                  <ListTitle>{coauthor.name}</ListTitle>
                  <ListSubtitle>{coauthor.email}</ListSubtitle>
                </ListContent>
                {isEditAllowed &&
                  isEditing &&
                  coauthor.email !== session.data?.user.email && (
                    <CourseDeleteCoAuthor
                      courseId={courseId}
                      coAuthorId={coauthor.id}
                    />
                  )}
              </ListItem>
            );
          })}
          {isEditAllowed && isEditing && (
            <CourseAddCoAuthor courseId={courseId} />
          )}
        </List>
      </CardContent>
    </Card>
  );
};
