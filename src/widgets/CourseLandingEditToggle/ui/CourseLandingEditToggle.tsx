'use client';
import { Card, CardContent, Icon, Switch } from '@/shared';
import { FC, useContext } from 'react';
import { CourseEditContext } from '@/features/CourseEditContext';

interface CourseLandingEditToggleProps {}

export const CourseLandingEditToggle: FC<CourseLandingEditToggleProps> = () => {
  const { isEditing, setIsEditing } = useContext(CourseEditContext);

  const changeEditModeHandler = (isOpen: boolean) => {
    setIsEditing(isOpen);
  };

  return (
    <Card className='flex-row'>
      <CardContent className='flex items-center gap-4 pt-4'>
        <Icon type='edit' className='flex-shrink-0 text-primary' />
        <span className='line-clamp-1 shrink grow font-NTSomic text-[0.8125rem] leading-tight'>
          Режим&nbsp;редактирования
        </span>
        <Switch onCheckedChange={changeEditModeHandler} checked={isEditing} className='shrink-0' />
      </CardContent>
    </Card>
  );
};
