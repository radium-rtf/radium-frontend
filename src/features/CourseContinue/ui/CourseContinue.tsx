import { FC } from 'react';
import Link from 'next/link';
import { Button, Icon, cn } from '@/shared';
import { useLastCoursePage } from '@/entities/Course';

interface CourseContinueProps {
  courseId: string;
  className?: string;
}

export const CourseContinue: FC<CourseContinueProps> = ({
  courseId,
  className,
}) => {
  const { nextPageId } = useLastCoursePage(courseId);
  return (
    <Button
      asChild
      className={cn('flex items-center gap-2', className)}
      type='button'
      color='outlined'
    >
      <Link scroll={false} href={`/courses/${courseId}/study/${nextPageId}`}>
        <Icon type='start' />
        <p>Продолжить</p>
      </Link>
    </Button>
  );
};
