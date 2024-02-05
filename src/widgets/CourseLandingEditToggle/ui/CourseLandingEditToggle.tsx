'use client';
import { Card, CardContent, Icon, Switch } from '@/shared';
import { FC, useContext, useId } from 'react';
import { CourseEditContext } from '@/features/CourseEditContext';

interface CourseLandingEditToggleProps {}

export const CourseLandingEditToggle: FC<CourseLandingEditToggleProps> = () => {
  const { isEditing, setIsEditing } = useContext(CourseEditContext);

  const toggleId = useId();

  const changeEditModeHandler = (isOpen: boolean) => {
    setIsEditing(isOpen);
  };

  return (
    <Card className='flex-row'>
      <CardContent className='flex items-center gap-4 py-6'>
        <Icon type='edit' className='flex-shrink-0 text-primary' />
        <label
          htmlFor={toggleId}
          className='line-clamp-1 shrink grow cursor-pointer font-NTSomic text-[0.8125rem] leading-tight'
        >
          Режим&nbsp;редактирования
        </label>
        <Switch
          id={toggleId}
          onCheckedChange={changeEditModeHandler}
          checked={isEditing}
          className='shrink-0'
        />
      </CardContent>
    </Card>
  );
};
