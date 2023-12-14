'use client';
import React, { FC, useContext } from 'react';
import { Card, List, cn } from '@/shared';
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
      <h1 className='mb-4 text-xl font-bold leading-[normal] text-primary-default'>
        Контакты
      </h1>
      <List className='-mx-6'>
        {contacts.map((contact) => {
          return (
            <List.Item className='relative' key={contact.name}>
              <Link
                className={cn(
                  'absolute inset-0',
                  isEditAllowed && isEditing && 'right-16'
                )}
                href={contact.link}
                target='_blank'
                rel='noreferrer noopener'
              />
              <List.Icon icon='link' />
              <List.Content className=''>
                <List.Title>{contact.name}</List.Title>
                <List.Subtitle className='line-clamp-1 w-48'>
                  {contact.link}
                </List.Subtitle>
              </List.Content>
              {isEditAllowed && isEditing ? (
                <CourseDeleteContact
                  courseId={courseId}
                  contactId={contact.id}
                />
              ) : (
                <List.Icon
                  className='h-[0.75rem] text-primary-default'
                  icon='external-link'
                />
              )}
            </List.Item>
          );
        })}
      </List>
      {isEditAllowed && isEditing && <CourseAddContact courseId={courseId} />}
    </Card>
  );
};
