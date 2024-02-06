import { Button, Card, CardHeader, Icon, Progress } from '@/shared';
import Link from 'next/link';
import { FC } from 'react';

interface PageNavigatorProps {
  next: string | null;
  previous: string | null;
  progressPercent: number;
}

export const PageNavigation: FC<PageNavigatorProps> = ({ previous, progressPercent, next }) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center gap-4 space-y-0 p-6'>
        {previous && (
          <Button variant='outline' asChild>
            <Link href={previous}>
              <Icon type='arrow-left' className='mr-4 text-inherit' />
              <span>Назад</span>
            </Link>
          </Button>
        )}
        <Progress showPercentage theme='primary' percentage={progressPercent}></Progress>
        {next && (
          <Button variant='outline' asChild>
            <Link href={next}>
              <span>Далее</span>
              <Icon type='arrow-right' className='ml-4 text-inherit' />
            </Link>
          </Button>
        )}
      </CardHeader>
    </Card>
  );
};
