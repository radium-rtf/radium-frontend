import { FC } from 'react';
import Link from 'next/link';
import { Button, Icon, cn } from '@/shared';
import { useLastCoursePage } from '@/entities/Course';

interface CourseContinueProps {
  courseId: string;
  courseSlug: string;
  size?: 'default' | 'wide';
  variant?: 'default' | 'outline';
}

export const CourseContinue: FC<CourseContinueProps> = ({
  courseId,
  courseSlug,
  size = 'wide',
  variant = 'default',
}) => {
  const { nextPageId } = useLastCoursePage(courseId);
  return (
    <Button
      className='z-10'
      asChild
      type='button'
      variant={variant || 'default'}
      size={size || 'wide'}
    >
      <Link scroll={false} href={`/c/${courseSlug}/${nextPageId || '0'}`}>
        <Icon type='start' className={cn('text-inherit', size === 'default' && 'mr-4')} />
        <span>Продолжить</span>
        {size === 'wide' && <Icon type='blank' />}
      </Link>
    </Button>
  );
};
