import React, { FC } from 'react';
import { Card, List } from '@/shared';
import { CourseResponseDto } from '../model/courseResponseDto';
import Link from 'next/link';

interface IProps {
  contacts: CourseResponseDto['links'];
}

export const CourseContacts: FC<IProps> = ({ contacts }) => {
  return (
    <Card className='gap-0 rounded-lg'>
      <h1 className='mb-4 text-xl font-bold leading-[normal] text-primary-default'>
        Контакты
      </h1>
      <List className='-mx-6'>
        {contacts.map((contact) => {
          return (
            <List.Item key={contact.name} asChild>
              <Link href={contact.link}>
                <List.Icon icon='link' />
                <List.Content>
                  <List.Title>Какой-то заголовок</List.Title>
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
    </Card>
  );
};
