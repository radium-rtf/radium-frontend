'use client';
import { Card, Icon, Toggle } from '@/shared';
import { FC, useContext } from 'react';
import { CourseEditContext } from '@/features/CourseEditContext';
import { ChangeEvent } from 'react';

interface CourseLandingEditToggleProps {}

export const CourseLandingEditToggle: FC<
  CourseLandingEditToggleProps
> = ({}) => {
  const { isEditing, setIsEditing } = useContext(CourseEditContext);

  const changeEditModeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setIsEditing(event.currentTarget.checked);

  return (
    <Card className='flex-row'>
      <Icon type='edit' className='flex-shrink-0 text-primary-default' />
      <span className='flex-grow font-mono text-[0.8125rem] leading-tight'>
        Режим&nbsp;редактирования
      </span>
      <Toggle
        onChange={changeEditModeHandler}
        name=''
        checked={isEditing}
        className='flex-shrink-0'
      />
    </Card>
  );
};
