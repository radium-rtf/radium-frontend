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
import { FC } from 'react';

interface CourseAuthorsProps {
  authors: CourseResponseDto['authors'];
  coauthors: CourseResponseDto['coauthors'];
}

export const CourseAuthors: FC<CourseAuthorsProps> = ({ authors, coauthors }) => {
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
                  className='-m-[0.1875rem] h-6 w-6 shrink-0 rounded-full object-cover'
                >
                  <Avatar className='h-6 w-6'>
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback>
                      <Image src='/defaultProfile.svg' width={24} height={24} alt={author.name} />
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
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};
