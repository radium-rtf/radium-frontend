'use client';
import React, { FC } from 'react';
import { Button, Card, Icon } from '@/shared';
import { useParams, useRouter } from 'next/navigation';

interface IProps {
  shortDescription: string;
  modulesCount: number;
}

export const CourseBrief: FC<IProps> = ({ shortDescription, modulesCount }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <Card className='flex flex-col gap-4 rounded-lg'>
      <p>{shortDescription}</p>
      <div className='flex items-center gap-2'>
        <Icon type='courses' />
        <span className='flex-grow'>{modulesCount} темы</span>
        <Button
          className='flex items-center gap-2'
          type='button'
          onClick={() => router.push(`/courses/${params.slug}/study`)}
          color='accent'
        >
          <Icon type='start' className='text-grey-800' />
          <p>Начать</p>
        </Button>
      </div>
    </Card>
  );
};
