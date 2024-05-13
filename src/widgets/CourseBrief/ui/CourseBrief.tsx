'use client';
import { FC, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Icon,
  Progress,
  getNoun,
  buttonVariants,
  useScrollPosition,
  cn,
} from '@/shared';
import { CourseJoin } from '@/features/CourseJoin';
import { CourseContinue } from '@/features/CourseContinue';
import Link from 'next/link';
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback';
import { ChangeCourseLogo } from '@/features/ChangeCourseLogo';

interface CourseBriefProps {
  shortDescription: string;
  isEditAllowed: boolean;
  modulesCount: number;
  percentage: number;
  isAssigned: boolean;
  courseId: string;
  courseSlug: string;
  title: string;
  logo: string;
}

export const CourseBrief: FC<CourseBriefProps> = ({
  shortDescription,
  isEditAllowed,
  modulesCount,
  percentage,
  isAssigned,
  courseId,
  courseSlug,
  title,
  logo,
}) => {
  const scrollPosition = useScrollPosition();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [logo]);

  return (
    <Card
      className={cn(
        'sticky top-28 z-10 -mt-8 mb-8 border border-transparent transition-colors',
        scrollPosition >= 224 && 'border-whiteMedium'
      )}
    >
      <CardHeader className='flex-row items-center gap-4 space-y-0'>
        <div className='relative shrink-0'>
          <ImageWithFallback
            fallback={
              <div className='h-[4.5rem] w-[4.5rem] shrink-0 rounded-[0.5rem] bg-backgroundOverlay'></div>
            }
            alt={'Course logo'}
            src={logo}
            width={72}
            height={72}
            className='h-[4.5rem] w-[4.5rem] shrink-0 rounded-[0.5rem] object-cover'
          />
          {isEditAllowed && (
            <ChangeCourseLogo
              hideText={!!logo && !isError}
              courseId={courseId}
              className='absolute inset-0'
            />
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='font-NTSomic text-lg font-medium leading-6 text-primary'>
            {title || '<без названия>'}
          </h2>
          <p className='line-clamp-2'>{shortDescription}</p>
        </div>
      </CardHeader>
      <CardContent>
        <Progress percentage={percentage} theme='primary' showPercentage />
      </CardContent>
      <CardFooter className='flex items-center gap-2'>
        <Icon type='courses' />
        <span className='flex-grow'>
          {modulesCount} {getNoun(modulesCount, 'тема', 'темы', 'тем')}
        </span>
        {isEditAllowed && (
          <Link
            href={`${courseSlug}/edit`}
            className={buttonVariants({ variant: 'outline' })}
            scroll={false}
          >
            <Icon type='edit' />
          </Link>
        )}
        {!isAssigned && <CourseJoin courseId={courseId} />}
        {isAssigned && <CourseContinue courseSlug={courseSlug} courseId={courseId} />}
      </CardFooter>
    </Card>
  );
};
