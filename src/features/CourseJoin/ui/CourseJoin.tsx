'use client';
import { Button, Icon } from '@/shared';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useJoinCourseMutation } from '../api/courseJoinApi';

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
        router.push(
          `/courses/${course.id}/study/${course.modules[0].pages[0]?.id}`
        );
      });
  };

  return (
    <Button
      onClick={onClickHandler}
      className='flex items-center gap-2'
      type='button'
      color='accent'
    >
      <Icon type='start' className='text-grey-800' />
      <p>Начать</p>
    </Button>
  );
};
