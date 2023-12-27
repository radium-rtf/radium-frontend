import React, { FC } from 'react';
import { Card, List } from '@/shared';
import { CourseResponseDto } from '@/entities/Course/model/CourseResponseDto';
import Link from 'next/link';

interface IProps {
  contacts: CourseResponseDto['links'];
}

export const CourseContacts: FC<IProps> = ({ contacts }) => {
  return (
    <Card className='gap-0 rounded-lg'>
      <h1 className='text-primary-default mb-4 text-xl font-bold leading-[normal]'>Контакты</h1>
      <List className='-mx-6'>
        {contacts.map((contact) => {
          return (
            <List.Item key={contact.name} asChild>
              <Link href={contact.link} target='_blank' rel='noreferrer noopener'>
                <List.Icon icon='link' />
                <List.Content>
                  <List.Title>Какой-то заголовок</List.Title>
                  <List.Subtitle>{contact.link}</List.Subtitle>
                </List.Content>
                <List.Icon className='text-primary-default h-[0.75rem]' icon='external-link' />
              </Link>
            </List.Item>
          );
        })}
      </List>
    </Card>
  );
};
