import { Icon } from '@/shared';
import { FC } from 'react';

interface CourseDeleteCoAuthorProps {
  email: string;
  courseId: string;
}

export const CourseDeleteCoAuthor: FC<CourseDeleteCoAuthorProps> = ({
  courseId,
  email,
}) => {
  return (
    <button
      type='button'
      onClick={() => {
        console.log(email, courseId);
      }}
    >
      <Icon type='remove' className='h-3 text-primary-default' />
    </button>
  );
};
