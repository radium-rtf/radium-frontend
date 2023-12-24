'use client';
import React, { FC, useContext } from 'react';
import {
  Card,
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
      <h1 className='text-primary-default mb-4 text-xl font-bold leading-[normal]'>
        Контакты
      </h1>
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
                  className='text-primary-default h-[0.75rem]'
                  icon='external-link'
                />
              )}
            </ListItem>
          );
        })}
      </List>
      {isEditAllowed && isEditing && <CourseAddContact courseId={courseId} />}
    </Card>
  );
};
