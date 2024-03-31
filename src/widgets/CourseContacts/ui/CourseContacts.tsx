import { FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  List,
  ListActionIcon,
  ListContent,
  ListIcon,
  ListItem,
  ListSubtitle,
  ListTitle,
} from '@/shared';
import Link from 'next/link';
import { CourseResponseDto } from '@/entities/Course';

interface IProps {
  contacts: CourseResponseDto['links'];
}
export const CourseContacts: FC<IProps> = ({ contacts }) => {
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
                  className={'absolute inset-0'}
                  href={contact.link}
                  target='_blank'
                  rel='noreferrer noopener'
                />
                <ListIcon icon='link' />
                <ListContent>
                  <ListTitle className='line-clamp-1'>{contact.name}</ListTitle>
                  <ListSubtitle className='line-clamp-1'>{contact.link}</ListSubtitle>
                </ListContent>
                <ListActionIcon
                  className='h-[0.75rem] shrink-0 text-primary'
                  icon='external-link'
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};
