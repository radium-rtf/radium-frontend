import React, { FC } from 'react';
import { Card } from '@/shared';
import { CourseResponseDto } from '@/entities/Course';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  contacts: CourseResponseDto['links'];
}

export const CourseContacts: FC<IProps> = ({ contacts }) => {
  return (
    <Card className='rounded-lg'>
      <h1 className='mb-6 text-xl text-accent-primary-200'>Контакты</h1>
      <ul className='flex flex-col gap-4'>
        {contacts.map((contact) => {
          return (
            <li key={contact.name} className='flex items-center gap-4'>
              <Link href={contact.link} prefetch={false}>
                {contact.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
