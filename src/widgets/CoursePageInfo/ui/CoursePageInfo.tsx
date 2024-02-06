'use client';
import { CoursePageResponseDto } from '@/entities/CoursePage';
import { CourseDeletePage } from '@/features/CourseDeletePage/ui/CourseDeletePage';
import { Card, CardHeader, Icon, getNoun } from '@/shared';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface CoursePageInfoProps {
  page: CoursePageResponseDto;
}

export const CoursePageInfo: FC<CoursePageInfoProps> = ({ page }) => {
  const { questions, tasks } = page.sections.reduce(
    (acc, section) => {
      if (section.type === 'code' || section.type === 'answer') {
        return { ...acc, tasks: acc.tasks + 1 };
      } else if (section.type === 'text') {
        return acc;
      } else {
        return { ...acc, questions: acc.questions + 1 };
      }
    },
    { questions: 0, tasks: 0 }
  );

  const router = useRouter();

  return (
    <Card>
      <CardHeader className='flex-row items-center gap-4 space-y-0 pb-6'>
        <Icon type='courses' className='flex-shrink-0' />
        <span className='flex-grow text-[0.8125rem]'>
          {questions} {getNoun(questions, 'вопрос', 'вопроса', 'вопросов')}, {tasks}{' '}
          {getNoun(tasks, 'задание', 'задания', 'заданий')}
        </span>
        <CourseDeletePage
          pageId={page.id}
          onDelete={() => router.replace(page.previous || page.next || '')}
        />
      </CardHeader>
    </Card>
  );
};
