'use client';
import { ChangeBanner } from '@/features/ChangeBanner';
import { cn } from '@/shared';
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback';
import { ImageProps } from 'next/image';
import { FC, useEffect, useState } from 'react';

type CourseBannerProps = ImageProps & {
  isEditAllowed: boolean;
  courseId: string;
};

export const CourseBanner: FC<CourseBannerProps> = ({
  src,
  alt,
  isEditAllowed,
  courseId,
  className,
  ...props
}) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [src]);

  return (
    <div className='relative'>
      <ImageWithFallback
        src={src}
        alt={alt}
        width={1280}
        height={256}
        priority
        fallback={
          <div className='h-64 w-full rounded-2xl bg-card object-cover object-[center_-16px]' />
        }
        className={cn('h-64 w-full rounded-2xl object-cover object-[center_-16px]', className)}
        {...props}
      />
      {isEditAllowed && (
        <ChangeBanner
          hideText={!!src && !isError}
          courseId={courseId}
          className='absolute inset-0'
        />
      )}
    </div>
  );
};
