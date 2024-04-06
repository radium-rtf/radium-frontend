import { useDeleteCourseCoAuthorMutation } from '@/entities/Course';
import { IconButton, SmallIcon } from '@/shared';
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
    <IconButton
      onClick={onClickHandler}
      type='button'
      className='action relative z-10 -m-[0.5625rem]'
    >
      <SmallIcon className='text-accent-primary' type='remove' />
    </IconButton>
  );
};
