import { FC } from 'react';
import Link from 'next/link';
import { Button, Icon } from '@/shared';
import { useLastCoursePage } from '@/entities/Course';

interface CourseContinueProps {
  courseId: string;
}

export const CourseContinue: FC<CourseContinueProps> = ({ courseId }) => {
  const { nextPageId } = useLastCoursePage(courseId);
  return (
    <Button className='z-10' asChild type='button' variant='outline'>
      <Link scroll={false} href={`/courses/${courseId}/${nextPageId}`}>
        <Icon type='start' className='mr-4 text-inherit' />
        <span>Продолжить</span>
      </Link>
    </Button>
  );
};
