'use client';
import { cn } from '@/shared';
import Image from 'next/image';
import { FC } from 'react';
import { AddBanner, ChangeBanner } from '@/features/ChangeBanner';

interface CourseBannerProps {
  url: string;
  name: string;
  courseId: string;
  isEditAllowed: boolean;
}

export const CourseBanner: FC<CourseBannerProps> = ({
  name,
  url,
  courseId,
  isEditAllowed,
}) => {
  return (
    <div
      className={cn(
        'relative mb-8 h-64 overflow-hidden rounded-lg bg-background-card md:container md:mx-auto md:mb-16'
      )}
    >
      {url !== '' ? (
        <>
          <Image
            src={url}
            alt={name}
            width={1280}
            height={256}
            className='aspect-[2] w-full object-cover md:aspect-[3] md:rounded-lg lg:aspect-[4]'
          />
          {isEditAllowed && <ChangeBanner courseId={courseId} />}
        </>
      ) : (
        isEditAllowed && <AddBanner courseId={courseId} />
      )}
    </div>
  );
};
