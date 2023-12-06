'use client';
import { Button, Icon, cn } from '@/shared';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useDeleteCourseMutation } from '@/entities/Course';

interface CourseDeleteSmallProps {
  courseId: string;
  className?: string;
}

export const CourseDeleteSmall: FC<CourseDeleteSmallProps> = ({
  courseId,
  className,
}) => {
  const { replace } = useRouter();
  const [deleteCourse] = useDeleteCourseMutation();

  const onClickHandler = () => {
    deleteCourse(courseId)
      .unwrap()
      .then(() => {
        replace('/');
      });
  };

  return (
    <Button
      color='destructive'
      onClick={onClickHandler}
      className={cn(className)}
    >
      <Icon type='delete' className='shrink-0 text-secondary-foreground' />
    </Button>
  );
};
