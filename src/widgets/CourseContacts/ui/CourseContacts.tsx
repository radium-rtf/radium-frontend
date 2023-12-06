'use client';
import React, { FC, useContext } from 'react';
import { Card, List } from '@/shared';
import Link from 'next/link';
import { CourseResponseDto } from '@/entities/Course';
import { CourseEditContext } from '@/features/CourseEditContext';
import { CourseAddContact } from '@/features/CourseAddContact';

interface IProps {
  contacts: CourseResponseDto['links'];
  isEditAllowed: boolean;
}

export const CourseContacts: FC<IProps> = ({ contacts, isEditAllowed }) => {
  const { isEditing } = useContext(CourseEditContext);

  return (
    <Card className='gap-0'>
      <h1 className='mb-4 text-xl font-bold leading-[normal] text-primary-default'>
        Контакты
      </h1>
      <List className='-mx-6'>
        {contacts.map((contact) => {
          return (
            <List.Item key={contact.name} asChild>
              <Link
                href={contact.link}
                target='_blank'
                rel='noreferrer noopener'
              >
                <List.Icon icon='link' />
                <List.Content>
                  <List.Title>{contact.name}</List.Title>
                  <List.Subtitle>{contact.link}</List.Subtitle>
                </List.Content>
                <List.Icon
                  className='h-[0.75rem] text-primary-default'
                  icon='external-link'
                />
              </Link>
            </List.Item>
          );
        })}
      </List>
      {isEditAllowed && isEditing && <CourseAddContact />}
    </Card>
  );
};
