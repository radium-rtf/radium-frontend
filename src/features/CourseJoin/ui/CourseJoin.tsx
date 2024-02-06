'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Icon } from '@/shared';
import { useJoinCourseMutation } from '@/entities/Course';

interface CourseJoinProps {
  courseId: string;
}

export const CourseJoin: FC<CourseJoinProps> = ({ courseId }) => {
  const router = useRouter();
  const [joinCourse] = useJoinCourseMutation();

  const onClickHandler = () => {
    joinCourse(courseId)
      .unwrap()
      .then((course) => {
        router.push(`/courses/${course.id}/${course.modules[0]?.pages?.[0]?.id || '0'}`);
      });
  };

  return (
    <Button onClick={onClickHandler} type='button'>
      <Icon type='start' className='mr-4 text-inherit' />
      <span>Начать</span>
    </Button>
  );
};
