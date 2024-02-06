import { useDeleteCourseCoAuthorMutation } from '@/entities/Course';
import { Icon } from '@/shared';
import { FC } from 'react';

interface CourseDeleteCoAuthorProps {
  coAuthorId: string;
  courseId: string;
}

export const CourseDeleteCoAuthor: FC<CourseDeleteCoAuthorProps> = ({ courseId, coAuthorId }) => {
  const [deleteCoAuthor] = useDeleteCourseCoAuthorMutation();

  const onClickHandler = () => {
    deleteCoAuthor({ courseId, coAuthorId });
  };

  return (
    <button type='button' onClick={onClickHandler}>
      <Icon type='remove' className='h-3 text-primary' />
    </button>
  );
};
