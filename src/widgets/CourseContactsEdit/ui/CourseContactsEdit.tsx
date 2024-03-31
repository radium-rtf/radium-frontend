import { CourseResponseDto } from '@/entities/Course';
import { CourseAddContact } from '@/features/CourseAddContact';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  IconButton,
  List,
  ListContent,
  ListIcon,
  ListItem,
  ListTitle,
  SmallIcon,
} from '@/shared';
import Link from 'next/link';
import { FC } from 'react';

type CourseContactsEditProps = {
  courseId: string;
  contacts: CourseResponseDto['links'];
};

export const CourseContactsEdit: FC<CourseContactsEditProps> = ({ courseId, contacts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Контакты</CardTitle>
      </CardHeader>
      <CardContent className='pb-6'>
        <List className='-mx-6'>
          {contacts.map((contact) => (
            <ListItem
              key={contact.id}
              className='relative hover:border-outlineGeneral hover:bg-whiteLight [&:has(.action:hover)]:hover:border-transparent [&:has(.action:hover)]:hover:bg-transparent'
            >
              <Link
                href={contact.link}
                target='_blank'
                className='absolute inset-0 rounded-[0.5rem]'
              />
              <ListIcon icon='link' />
              <ListContent>
                <ListTitle>{contact.name}</ListTitle>
              </ListContent>
              <IconButton className='action relative z-10 -m-[0.5625rem]'>
                <SmallIcon className='text-accent-primary' type='remove' />
              </IconButton>
            </ListItem>
          ))}
          <CourseAddContact courseId={courseId} />
        </List>
      </CardContent>
    </Card>
  );
};
