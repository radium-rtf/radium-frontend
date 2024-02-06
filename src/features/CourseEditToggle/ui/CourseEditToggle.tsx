'use client';
import { CourseEditContext } from '@/features/CourseEditContext';
import { Icon, Switch, cn } from '@/shared';
import { FC, HTMLAttributes, useContext } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export const CourseEditToggle: FC<IProps> = ({ className, ...props }) => {
  const { isEditing, setIsEditing } = useContext(CourseEditContext);

  return (
    <div className={cn('flex items-center gap-4 px-6 py-2.5', className)} {...props}>
      <Icon type='edit' className='flex-shrink-0 text-primary' />
      <p className='text-[0.8125rem]'>Режим редактирования</p>
      <Switch
        checked={isEditing}
        className='shrink-0'
        name='CourseEdit'
        onCheckedChange={(isChecked) => {
          setIsEditing(isChecked);
        }}
      />
    </div>
  );
};
