'use client';
import { FC } from 'react';
import { MarkdownDisplay } from '@radium-ui-kit/MarkdownDisplay';
import { Card, CardContent, CardHeader, CardTitle, Icon } from '@/shared';

interface CourseDescriptionDisplayProps {
  description: string;
}

export const CourseDescriptionDisplay: FC<CourseDescriptionDisplayProps> = ({ description }) => {
  return (
    <Card className='gap-6 lg:grow'>
      <CardHeader className='flex-row items-center gap-4 space-y-0'>
        <Icon type='question' className='text-primary' />
        <CardTitle className='text-[1rem]'>О курсе</CardTitle>
      </CardHeader>

      <CardContent className='pb-6'>
        {description ? (
          <MarkdownDisplay markdown={description} />
        ) : (
          <span className='text-white/50'>{'<Описание отсутствует>'}</span>
        )}
      </CardContent>
    </Card>
  );
};
