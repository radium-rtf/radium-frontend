'use client';
import { FC } from 'react';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { Card, CardContent, CardHeader, CardTitle, Icon } from '@/shared';

interface CourseDescriptionDisplayProps {
  description: string;
}

export const CourseDescriptionDisplay: FC<CourseDescriptionDisplayProps> = ({
  description,
}) => {
  return (
    <Card className='gap-6'>
      <CardHeader className='flex-row items-center gap-4 space-y-0'>
        <Icon type='question' className='text-primary' />
        <CardTitle className='text-base'>О курсе</CardTitle>
      </CardHeader>

      <CardContent className='pb-6'>
        <MarkdownDisplay markdown={description} />
      </CardContent>
    </Card>
  );
};
