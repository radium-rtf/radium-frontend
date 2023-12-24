'use client';
import React, { FC, useContext } from 'react';
import {
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
  cn,
} from '@/shared';
import Link from 'next/link';
import { CourseResponseDto } from '@/entities/Course';
import { CourseEditContext } from '@/features/CourseEditContext';
import { CourseAddContact } from '@/features/CourseAddContact';
import { CourseDeleteContact } from '@/features/CourseDeleteContact';

interface IProps {
  contacts: CourseResponseDto['links'];
  courseId: string;
  isEditAllowed: boolean;
}

export const CourseContacts: FC<IProps> = ({
  contacts,
  isEditAllowed,
  courseId,
}) => {
  const { isEditing } = useContext(CourseEditContext);

  return (
    <Card className='gap-0'>
      <CardHeader>
        <CardTitle>Контакты</CardTitle>
      </CardHeader>
      <CardContent>
        <List className='-mx-6'>
          {contacts.map((contact) => {
            return (
              <ListItem className='relative' key={contact.name}>
                <Link
                  className={cn(
                    'absolute inset-0',
                    isEditAllowed && isEditing && 'right-16'
                  )}
                  href={contact.link}
                  target='_blank'
                  rel='noreferrer noopener'
                />
                <ListIcon icon='link' />
                <ListContent className=''>
                  <ListTitle>{contact.name}</ListTitle>
                  <ListSubtitle className='line-clamp-1 w-48'>
                    {contact.link}
                  </ListSubtitle>
                </ListContent>
                {isEditAllowed && isEditing ? (
                  <CourseDeleteContact
                    courseId={courseId}
                    contactId={contact.id}
                  />
                ) : (
                  <ListIcon
                    className='h-[0.75rem] text-primary'
                    icon='external-link'
                  />
                )}
              </ListItem>
            );
          })}
          {isEditAllowed && isEditing && (
            <CourseAddContact courseId={courseId} />
          )}
        </List>
      </CardContent>
    </Card>
  );
};
