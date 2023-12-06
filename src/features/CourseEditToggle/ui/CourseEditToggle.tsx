'use client';
import { CourseEditContext } from '@/features/CourseEditContext';
import { Icon, Toggle, cn } from '@/shared';
import { FC, HTMLAttributes, useContext } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export const CourseEditToggle: FC<IProps> = ({ className, ...props }) => {
  const { isEditing, setIsEditing } = useContext(CourseEditContext);
  return (
    <div
      className={cn('flex items-center gap-4 px-6 py-2.5', className)}
      {...props}
    >
      <Icon type='edit' className='flex-shrink-0 text-primary-default' />
      <p className='text-[0.8125rem] text-text-primary'>Режим редактирования</p>
      <Toggle
        checked={isEditing}
        className='shrink-0'
        name='CourseEdit'
        onChange={(e) => {
          setIsEditing(e.target.checked);
        }}
      />
    </div>
  );
};
