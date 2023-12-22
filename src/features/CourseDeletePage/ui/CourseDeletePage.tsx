'use client';
import { useDeleteCoursePageMutation } from '@/entities/CoursePage';
import { Button, Icon } from '@/shared';
import { FC } from 'react';

interface CourseDeletePageProps {
  pageId: string;
  onDelete?: () => void;
}

export const CourseDeletePage: FC<CourseDeletePageProps> = ({
  pageId,
  onDelete,
}) => {
  const [deletePage] = useDeleteCoursePageMutation();

  const onClickHandler = () => {
    deletePage(pageId).unwrap().then(onDelete);
  };

  return (
    <Button
      color='destructive'
      className='flex-shrink-0'
      onClick={onClickHandler}
    >
      <Icon type='delete' className='text-inherit' />
      <span>Удалить страницу</span>
    </Button>
  );
};
