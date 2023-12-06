import { Button, Card, Icon, Progress } from '@/shared';
import Link from 'next/link';
import { FC } from 'react';

interface PageNavigatorProps {
  next: string | null;
  previous: string | null;
  progressPercent: number;
}

export const PageNavigation: FC<PageNavigatorProps> = ({
  previous,
  progressPercent,
  next,
}) => {
  return (
    <Card className='flex flex-row items-center'>
      {previous && (
        <Button asChild>
          <Link href={previous}>
            <Icon type='arrow-left' />
            <span>Назад</span>
          </Link>
        </Button>
      )}
      <Progress
        showPercentage
        theme='primary'
        percentage={progressPercent}
      ></Progress>
      {next && (
        <Button asChild>
          <Link href={next}>
            <span>Далее</span>
            <Icon type='arrow-right' />
          </Link>
        </Button>
      )}
    </Card>
  );
};
