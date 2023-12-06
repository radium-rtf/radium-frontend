'use client';
import { ButtonHTMLAttributes, FC } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Icon, cn } from '@/shared';
import { useJoinCourseMutation } from '@/entities/Course';

interface CourseJoinProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  courseId: string;
}

export const CourseJoin: FC<CourseJoinProps> = ({
  courseId,
  className,
  ...props
}) => {
  const router = useRouter();
  const [joinCourse] = useJoinCourseMutation();

  const onClickHandler = () => {
    joinCourse(courseId)
      .unwrap()
      .then((course) => {
        router.push(
          `/courses/${course.id}/study/${
            course.modules[0]?.pages?.[0]?.id || ''
          }`
        );
      });
  };

  return (
    <Button
      onClick={onClickHandler}
      className={cn('flex items-center gap-2', className)}
      type='button'
      {...props}
      color='accent'
    >
      <Icon type='start' className='text-grey-800' />
      <p>Начать</p>
    </Button>
  );
};
